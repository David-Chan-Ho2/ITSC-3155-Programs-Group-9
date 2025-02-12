import clsx from "clsx"
import { useUpdateTask } from "../../hooks/useUpdateTask"
import { ITask } from "../../types/tasks.types"

interface ITaskItem {
  task: ITask
}

function TaskItem({ task }: ITaskItem) {
  const completeTaskMutation = useUpdateTask()

  return (
    <div className="flex gap-5">
      <input type="checkbox" checked={task.completed} onClick={() => completeTaskMutation.mutate(task)} />
      <p className={clsx(task.completed ? 'line-through' : '')}>{task.title}</p>
    </div>
  )
}

export default TaskItem