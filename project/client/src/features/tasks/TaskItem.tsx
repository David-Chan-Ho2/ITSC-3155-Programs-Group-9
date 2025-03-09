import clsx from "clsx"
import { useDeleteTask, useUpdateTask } from "../../app/hooks"
import { ITask } from "../../types/tasks.types"
import Button from "../../components/buttons/Button"

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
      <a className={clsx(task.completed ? 'line-through' : '')} href={`/tasks/${task.id}`}>{task.title}</a>
      <Button onClick={onDeleteTask}>
        x
      </Button>
    </div>
  )
}

export default TaskItem