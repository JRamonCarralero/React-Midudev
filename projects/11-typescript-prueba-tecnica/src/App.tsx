import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UserList'
import { type User } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)        
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  } 

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(data => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
      .catch(err => console.log(err))
  }, [])

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0 
      ? users.filter(user => {
        return user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase())
      }) 
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    return sortByCountry 
      ? filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country)) 
      : filteredUsers
  }, [filteredUsers, sortByCountry])

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>
        <button onClick={toggleSortByCountry}>
          { sortByCountry ? 'No ordenar por países' : 'Ordenar por país' }
        </button>
        <button onClick={handleReset}>
          Resetear
        </button>
        <input placeholder='Filtra por país' onChange={(e) => setFilterCountry(e.target.value)} />
      </header>
      <UsersList showColors={showColors} onDelete={handleDelete} users={sortedUsers} />
    </div>
  )
}

export default App
