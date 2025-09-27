import { useState, type JSX } from "react"
import { mockTodos } from "./mocks/todos"
import { Todos } from "./components/Todos"
import type { FilterValue, Todo, TodoId } from "./types"
import { TODO_FILTERS } from "./const"
import { Footer } from "./components/Footer"

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

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

  const handleFilterChanges = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCounts = todos.length - activeCount

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  return (
    <div className="todoapp">
      <Todos todos={filteredTodos} onRemove={handleRemove} onToggleCompleted={handleCompleted} />
      <Footer
        activeCount={activeCount}
        completedCount={completedCounts}
        filterSelected={filterSelected}
        onClearCompleted={() => {}}
        handleFilterChange={handleFilterChanges}
      />

    </div>
  )
}

export default App
