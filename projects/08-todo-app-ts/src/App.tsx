import { useState, type JSX } from "react"
import { mockTodos } from "./mocks/todos"
import { Todos } from "./components/Todos"

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)

  const handleRemove = (id: string): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  return (
    <div className="todoapp">
      <Todos todos={todos} onRemove={handleRemove} />
    </div>
  )
}

export default App
