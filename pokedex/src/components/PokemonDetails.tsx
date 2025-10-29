import { useFetch } from '../hooks/useFetch'

interface PokemonSprite {
  front_default: string
}

interface PokemonTypeInfo {
  type: {
    name: string
  }
}

interface PokemonDetailsApiType {
  name: string
  sprites: PokemonSprite
  types: PokemonTypeInfo[]
}

export const PokemonDetails = ({
  pokemonUrl,
}: {
  pokemonUrl: string | null
}) => {
  const { data, error, loading } = useFetch<PokemonDetailsApiType>(pokemonUrl)

  if (error) return <p>{error.message}</p>
  if (loading) return <p>Loading...</p>

  if (!data) {
    return (
      <div>
        <h3>Detalhes</h3>
        <p>Selecione um Pokémon da lista para ver os detalhes.</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Detalhes de {data.name}</h3>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>{data.name}</p>
      <p>
        <strong>Tipo:</strong>{' '}
        {data.types.map((type: any) => type.type.name).join(', ')}
      </p>
    </div>
  )
}
