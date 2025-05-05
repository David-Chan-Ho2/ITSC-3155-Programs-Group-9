import { ITask } from "../../types/tasks.types"
import TaskItem from "./TaskItem"

interface ITaskList {
    tasks: ITask[]
}

function TaskList({ tasks }: ITaskList) {
    return (
        <ul className="divide-y divide-gray-100 w-1/2">
            {tasks.map(task => (
                <li key={`task-${task.id}`} className="flex justify-between gap-x-6 py-5">
                    <TaskItem task={task} />
                </li>
            ))}
        </ul>
    )
}

export default TaskList