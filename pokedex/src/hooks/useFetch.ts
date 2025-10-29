import { useEffect, useReducer } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

type Action<T> =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: T }
  | { type: 'FETCH_ERROR'; payload: Error }

function fetchReducer<T>(
  state: FetchState<T>,
  action: Action<T>,
): FetchState<T> {
  switch (action.type) {
    case 'FETCH_START':
      return { data: null, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { data: action.payload, loading: false, error: null }
    case 'FETCH_ERROR':
      return { data: null, loading: false, error: action.payload }
    default:
      return state
  }
}

export const useFetch = <T>(url: string | null): FetchState<T> => {
  const initialState: FetchState<T> = {
    data: null,
    loading: false,
    error: null,
  }

  const [state, dispatch] = useReducer(fetchReducer<T>, initialState)

  useEffect(() => {
    const abortController = new AbortController()

    if (!url) {
      dispatch({ type: 'FETCH_ERROR', payload: new Error('URL inválida') })
      return
    }

    const fetchData = async () => {
      dispatch({ type: 'FETCH_START' })
      try {
        const response = await fetch(url, {
          signal: abortController.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.log('Fetch abortado')
          } else {
            dispatch({ type: 'FETCH_ERROR', payload: error })
          }
        } else {
          dispatch({ type: 'FETCH_ERROR', payload: error as Error })
        }
      }
    }

    fetchData()

    return () => {
      abortController.abort()
    }
  }, [url])

  return state
}
