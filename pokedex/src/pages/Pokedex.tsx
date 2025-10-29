import { useCallback, useState } from 'react'
import { useTeam } from '../contexts/TeamContext'
import { TeamSidebar } from '../components/TeamSidebar'
import { PokemonList } from '../components/PokemonList'
import { PokemonDetails } from '../components/PokemonDetails'
import type { PokemonType } from '../components/Pokemon'

export const Pokedex = () => {
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState<string | null>(
    null,
  )
  const { dispatch } = useTeam()

  const handlePokemonSelected = useCallback((pokemon: PokemonType) => {
    setSelectedPokemonUrl(pokemon.url)
  }, [])

  const handleAddToTeam = useCallback(
    (pokemon: any) => {
      dispatch({ type: 'ADD_POKEMON', payload: pokemon })
    },
    [dispatch],
  )

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <TeamSidebar />
      <PokemonList
        onPokemonSelected={handlePokemonSelected}
        onAddToTeam={handleAddToTeam}
      />
      <PokemonDetails pokemonUrl={selectedPokemonUrl} />
    </div>
  )
}
