import { createContext, useContext, useMemo, useReducer } from 'react'

interface Pokemon {
  name: string
  url: string
}

interface TeamState {
  team: Pokemon[]
}

type Action =
  | { type: 'ADD_POKEMON'; payload: Pokemon }
  | { type: 'REMOVE_POKEMON'; payload: string }

const initialState: TeamState = {
  team: [],
}

const teamReducer = (state: TeamState, action: Action): TeamState => {
  switch (action.type) {
    case 'ADD_POKEMON':
      if (state.team.length === 6) return state

      if (state.team.find((pokemon) => pokemon.name === action.payload.name))
        return state

      return {
        ...state,
        team: [...state.team, action.payload],
      }

    case 'REMOVE_POKEMON':
      return {
        ...state,
        team: state.team.filter((pokemon) => pokemon.name !== action.payload),
      }
    default:
      return state
  }
}

export const TeamContext = createContext<
  | {
      team: Pokemon[]
      dispatch: React.Dispatch<Action>
    }
  | undefined
>(undefined)

export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(teamReducer, initialState)

  const value = useMemo(() => {
    return {
      team: state.team,
      dispatch,
    }
  }, [state, dispatch])

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
}

export const useTeam = () => {
  const context = useContext(TeamContext)

  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider')
  }

  return context
}
