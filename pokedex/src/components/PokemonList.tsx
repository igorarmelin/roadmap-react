import { useMemo, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useDebounce } from '../hooks/useDebounce'
import { Pokemon, type PokemonType } from './Pokemon'

interface PokemonListProps {
  onPokemonSelected: (pokemon: PokemonType) => void
  onAddToTeam: (pokemon: PokemonType) => void
}

interface PokemonListApiResponse {
  results: PokemonType[]
}

export const PokemonList = ({
  onPokemonSelected,
  onAddToTeam,
}: PokemonListProps) => {
  const { data, error, loading } = useFetch<PokemonListApiResponse>(
    'https://pokeapi.co/api/v2/pokemon?limit=800',
  )
  const [searchTerm, setSearchTerm] = useState('')
  const searchDebounced = useDebounce(searchTerm, 500)

  const filteredPokemon = useMemo(() => {
    if (!data || !data.results) {
      return []
    }
    return data.results.filter((pokemon: PokemonType) => {
      return pokemon.name.toLowerCase().includes(searchDebounced.toLowerCase())
    })
  }, [data, searchDebounced])

  if (error) return <p>{error.message}</p>
  if (loading) return <p>Loading...</p>

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <hr />

      {filteredPokemon.map((pokemon: PokemonType) => (
        <Pokemon
          key={pokemon.name}
          onSelect={() => onPokemonSelected(pokemon)}
          onAddToTeam={() => onAddToTeam(pokemon)}
          pokemon={pokemon}
        />
      ))}
    </div>
  )
}
