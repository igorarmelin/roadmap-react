import { useEffect, useState } from 'react'

// @duvida - tipagem nas props com {} e sem
export const useGitHubUser = (username: string) => {
  const [user, setUser] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!username) {
      setUser(null)
      setIsLoading(false)
      setError(null)
      return
    }

    const fetchUser = async () => {
      setIsLoading(true)
      setUser(null)
      setError(null)

      try {
        const response = await fetch(`https://api.github.com/users/${username}`)

        if (response.status === 404) {
          throw new Error('Usuário não encontrado.')
        }
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`)
        }

        const data = await response.json()
        setUser(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [username])

  return { user, isLoading, error }
}
