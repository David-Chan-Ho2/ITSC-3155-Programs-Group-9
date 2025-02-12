import clsx from "clsx"
import { useDeleteTask } from "../../hooks/useDeleteTask"
import { useUpdateTask } from "../../hooks/useUpdateTask"
import { ITask } from "../../types/tasks.types"

interface ITaskItem {
  task: ITask
}

function TaskItem({ task }: ITaskItem) {
  const completeTaskMutation = useUpdateTask()
  const deleteTaskMutation = useDeleteTask()

  const onCompleteTask = () => {
    completeTaskMutation.mutate({ ...task, completed: !task.completed })
  }

  const onDeleteTask = () => {
    deleteTaskMutation.mutate(task.id)
  }

  return (
    <div className="flex gap-5">
      <input type="checkbox" checked={task.completed} onChange={onCompleteTask} />
      <p className={clsx(task.completed ? 'line-through' : '')}>{task.title}</p>
      <button onClick={onDeleteTask}>
        x
      </button>
    </div>
  )
}

export default TaskItem