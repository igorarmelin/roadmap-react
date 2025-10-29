import { TeamProvider } from './contexts/TeamContext'
import { Pokedex } from './pages/Pokedex'

function App() {
  return (
    <TeamProvider>
      <Pokedex />
    </TeamProvider>
  )
}

export default App
