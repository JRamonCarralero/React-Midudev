export const searchMovies = async ({ search }) => {
  if (!search) return

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${search}`)

    const data = await response.json()
    
    return data.Search.map((movie) => {
      return {
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      }
    })
  } catch (error) {
    console.log(error)
    throw new Error('Error al buscar peliculas')
  }
}