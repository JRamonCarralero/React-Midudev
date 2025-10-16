import { useEffect, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UserList'
import { type User } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
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

  const sortedUsers = sortByCountry ? users.toSorted((a, b) => a.location.country.localeCompare(b.location.country)) : users

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
      </header>
      <UsersList showColors={showColors} onDelete={handleDelete} users={sortedUsers} />
    </div>
  )
}

export default App
