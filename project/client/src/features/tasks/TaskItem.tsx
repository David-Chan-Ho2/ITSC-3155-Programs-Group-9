import clsx from "clsx"
import { useDeleteTask, useUpdateTask } from "../../app/hooks"
import Button from "../../components/buttons/Button"
import Link from "../../components/links/Link"
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
    deleteTaskMutation.mutate(task)
  }

  return (
    <div className="flex gap-5">
      <input type="checkbox" checked={task.completed} onChange={onCompleteTask} />
      <Link className={clsx(task.completed ? 'line-through' : '')} to={`tasks/${task.id}`}>{task.title}</Link>
      <Button onClick={onDeleteTask}>
        x
      </Button>
    </div>
  )
}

export default TaskItem