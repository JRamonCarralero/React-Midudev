import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  // Usar useCallback para optimizar la busqueda de peliculas
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return
    try{
      setLoading(true)
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Usar useMemo para optimizar la busqueda de peliculas
  // Sólo se ejecuta cuando cambia el sort o movies
  const sortedMovies = useMemo(() => {
    const sortedMovies = sort 
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies
    return sortedMovies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, error }
}