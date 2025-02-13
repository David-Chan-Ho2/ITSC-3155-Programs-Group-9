import { useTasks } from "../../app/hooks"
import TaskItem from "./TaskItem"

interface ITaskList {
    projectId: number
}

function TaskList({ projectId }: ITaskList) {
    const { data: tasks, isLoading } = useTasks(projectId)

    if (isLoading) return <p>Loading tasks...</p>

    return (
        <ul>
            {tasks.map(task => (
                <li key={`task-${task.id}`}>
                    <TaskItem task={task} />
                </li>
            ))}
        </ul>
    )
}

export default TaskList