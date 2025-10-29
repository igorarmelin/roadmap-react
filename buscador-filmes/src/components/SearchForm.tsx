import { useEffect, useRef, useState, type FormEvent } from 'react'

interface SearchFormProps {
  onSearch: (query: string) => void
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [inputValue, setInputValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    onSearch(inputValue)

    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  )
}
