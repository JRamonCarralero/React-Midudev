import { useEffect, useState } from 'react'
import './App.css'
import { UsersList } from './components/UserList'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(data => setUsers(data.results))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <UsersList users={users} />
    </div>
  )
}

export default App
