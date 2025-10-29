import React from 'react'

export type PokemonType = {
  name: string
  url: string
}

interface PokemonProps {
  pokemon: PokemonType
  onAddToTeam: () => void
  onSelect: () => void
}

export const Pokemon = React.memo(
  ({ pokemon, onAddToTeam, onSelect }: PokemonProps) => {
    return (
      <div style={{ margin: '8px', padding: '8px', border: '1px solid #eee' }}>
        <div
          onClick={onSelect}
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          {pokemon.name}
        </div>

        <button onClick={onAddToTeam} style={{ marginTop: '4px' }}>
          Add to team
        </button>
      </div>
    )
  },
)
