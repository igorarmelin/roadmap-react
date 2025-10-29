import { MovieCard } from './MovieCard'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

interface MovieListProps {
  movies: Movie[]
}

export const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div>
      {movies.map((movie: Movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  )
}
