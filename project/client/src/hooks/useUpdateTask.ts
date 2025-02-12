import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTask } from "../api/tasks.api"
import { ITask } from "../types/tasks.types"

export const useUpdateTask = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (task: ITask) => updateTask(task),
        onSuccess: (_, task) => {
            queryClient.setQueryData(["tasks", task.projectId], (oldTasks: ITask[] | undefined) => {
                return oldTasks?.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t)) || []
            })
        },
    })
}