import { useState } from 'react'
import { useMovieSearch } from '../hooks'
import { MovieList, SearchForm } from '../components'

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { error, isLoading, movies } = useMovieSearch(searchTerm)

  return (
    <div>
      <header>
        <h1>Buscador de Filmes</h1>
      </header>

      <SearchForm onSearch={setSearchTerm} />

      <main>
        {isLoading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Erro: {error.message}</p>
        ) : movies.length > 0 ? (
          <MovieList movies={movies} />
        ) : (
          <p>Procure por um filme para começar.</p>
        )}
      </main>
    </div>
  )
}
