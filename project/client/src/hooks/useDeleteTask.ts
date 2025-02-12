import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTask } from "../api/tasks.api"
import { ITask } from "../types/tasks.types"

export const useDeleteTask = () => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, number>({
        mutationFn: (taskId) => deleteTask(taskId),
        onSuccess: (_, taskId) => {
            console.log('Delete Task')
            queryClient.setQueryData(["tasks"], (oldTasks: ITask[] | undefined) => {
                if (!oldTasks) return []
                return oldTasks.filter((task) => task.id !== taskId)
            })
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
        onError: (error: any) => {
            console.log(`Login failed: ${error.response?.data?.message || error.message}`)
        }
    })
}