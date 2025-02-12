import { useQuery } from "@tanstack/react-query"
import { getTasks } from "../api/tasks.api"
import { ITask } from "../types/tasks.types"

const useTasks = (projectId: number) => {
    return useQuery<ITask[], Error>({ queryKey: ['tasks', projectId], queryFn: () => getTasks(projectId) })
}

export default useTasks