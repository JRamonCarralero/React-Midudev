import { useMemo, useState } from 'react'
import './App.css'
import { UsersList } from './components/UserList'
import { SortBy, type User } from './types.d'
import { useUsers } from './hooks/useUsers'

function App() {
  const { isLoading, isError, refetch, fetchNextPage, hasNextPage, users } = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    console.log(email)
    //const filteredUsers = users.filter(user => user.email !== email)
  }

  const handleReset = () => {
    void refetch()
  } 

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0 
      ? users?.filter(user => {
        return user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase())
      }) 
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers?.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>
        <button onClick={toggleSortByCountry}>
          { sorting === SortBy.COUNTRY ? 'No ordenar por países' : 'Ordenar por país' }
        </button>
        <button onClick={handleReset}>
          Resetear
        </button>
        <input placeholder='Filtra por país' onChange={(e) => setFilterCountry(e.target.value)} />
      </header>
      <main>
        { users && users?.length > 0 && <UsersList changeSorting={handleChangeSort} showColors={showColors} onDelete={handleDelete} users={sortedUsers} />}

        {isLoading && <h2>Cargando...</h2>}

        {!isLoading && isError && <h2>Ha ocurrido un error</h2>}

        {!isLoading && !isError && users?.length === 0 && <h2>No hay usuarios</h2>}

        {!isLoading && !isError && users && users?.length > 0 && hasNextPage && <button onClick={() => void fetchNextPage()}>Cargar más resultados</button>}

        {!hasNextPage && <h2>No hay más resultados</h2>}
      </main>
    </div>
  )
}

export default App
