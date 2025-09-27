import { type ListOfTodos, type TodoId, type Todo as TodoType } from "../types"
import { Todo } from "./Todo"

interface Props {
  todos: ListOfTodos
  onRemove: ({ id }: TodoId) => void
  onToggleCompleted: ({ id, completed }: Pick<TodoType, "id" | "completed">) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemove, onToggleCompleted }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
          <Todo 
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemove={onRemove}
            onToggleCompleted={onToggleCompleted}
          />       
        </li>
      ))}
    </ul>
  )
}