import { type TodoId, type Todo as TodoType } from "../types"

interface Props extends TodoType {
  onRemove: ({ id }: TodoId) => void
  onToggleCompleted: ({ id, completed }: Pick<TodoType, "id" | "completed">) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemove, onToggleCompleted }) => {
  const handleChangedCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => onToggleCompleted({ id, completed: event.target.checked })

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={completed} onChange={handleChangedCheckbox} />
      <label>{title}</label>
      <button className="destroy" onClick={() => onRemove({ id })} />
    </div>
  )
}