import { useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export const useMovieSearch = (searchTerm: string) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const debouncedSearch = useDebounce(searchTerm)

  useEffect(() => {
    if (!debouncedSearch) {
      setMovies([])
      setIsLoading(false)
      setError(null)
      return
    }

    const controller = new AbortController()

    const fetchMovies = async () => {
      setMovies([])
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${debouncedSearch}&apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }`,
          { signal: controller.signal },
        )

        if (response.status === 404) {
          throw new Error('Filme não encontrado!')
        }
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`)
        }

        const data = await response.json()

        if (data.Response === 'False') {
          throw new Error(data.Error)
        }
        setMovies(data.Search)
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          console.log('Busca abortada')
          return
        }
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()

    return () => {
      controller.abort()
    }
  }, [debouncedSearch])

  return { movies, isLoading, error }
}
