import { ITask } from "../../types/tasks.types"
import TaskItem from "./TaskItem"

interface ITaskList {
    tasks: ITask[]
}

function TaskList({ tasks }: ITaskList) {
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