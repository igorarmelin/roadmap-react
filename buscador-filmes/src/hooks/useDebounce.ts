import { useEffect, useState } from 'react'

export const useDebounce = (inputValue: string) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [inputValue])

  return debouncedValue
}
