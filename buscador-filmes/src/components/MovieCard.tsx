interface MovieCardProps {
  movie: {
    Title: string
    Year: string
    imdbID: string
    Poster: string
  }
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const moviePoster =
    movie.Poster === 'N/A' ? 'https://placehold.co/400' : movie.Poster

  return (
    <div className="movie-card">
      <img src={moviePoster} alt={movie.Title} />
      <h4>{movie.Title}</h4>
      <p>{movie.Year}</p>
    </div>
  )
}
