import { useState } from 'react'
import { SearchForm, UserProfileCard } from '../components'
import { useGitHubUser } from '../hooks'

export const Home = () => {
  const [searchedUsername, setSearchedUsername] = useState('')
  const { error, isLoading, user } = useGitHubUser(searchedUsername)

  const renderContent = () => {
    if (isLoading) {
      return <p>Carregando...</p>
    }

    if (error) {
      return <p style={{ color: 'red' }}>Erro: {error.message}</p>
    }

    if (user) {
      return <UserProfileCard user={user} />
    }

    return <p>Digite um nome de usuário para começar.</p>
  }

  return (
    <div>
      <header>
        <h1>Buscador de Perfis GitHub</h1>
      </header>

      <SearchForm onSubmit={setSearchedUsername} />

      <main>{renderContent()}</main>
    </div>
  )
}
