import { useEffect, useRef, useState, type FormEvent } from 'react'

interface SearchFormProps {
  onSubmit: (username: string) => void
}

export const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (inputValue.trim() === '') return

    onSubmit(inputValue)

    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
      />
      <button type="submit">Buscar</button>
    </form>
  )
}
