import { useTeam } from '../contexts/TeamContext'

export const TeamSidebar = () => {
  const { team, dispatch } = useTeam()

  return (
    <div>
      <h2>Meu Time ({team.length} / 6)</h2>
      <ul>
        {team.length === 0 && <p>Seu time está vazio.</p>}
        {team.map((pokemon) => (
          <li key={pokemon.name}>
            {pokemon.name}{' '}
            <span
              style={{ cursor: 'pointer' }}
              onClick={() =>
                dispatch({ type: 'REMOVE_POKEMON', payload: pokemon.name })
              }
            >
              ❌
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
