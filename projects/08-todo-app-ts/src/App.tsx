import { useState, type JSX } from "react"
import { mockTodos } from "./mocks/todos"
import { Todos } from "./components/Todos"
import type { Todo, TodoId } from "./types"

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: Pick<Todo, "id" | "completed">): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed }
      }
      return todo
    })
    setTodos(newTodos)
  }

  return (
    <div className="todoapp">
      <Todos todos={todos} onRemove={handleRemove} onToggleCompleted={handleCompleted} />
    </div>
  )
}

export default App
