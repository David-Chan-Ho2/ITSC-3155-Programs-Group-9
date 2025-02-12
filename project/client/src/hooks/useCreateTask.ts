import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTask } from "../api/tasks.api"
import { ITask } from "../types/tasks.types"

const useCreateTask = () => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, Omit<ITask, 'id'>>({
        mutationFn: (task) => createTask(task),
        onSuccess: (_, task) => {
            console.log('Create Task')
            queryClient.setQueryData(["tasks", task.projectId], (oldTasks: ITask[] | undefined) => {
                return [...oldTasks, task]
            })
        },
        onError: (error: any) => {
            console.log(`Login failed: ${error.response?.data?.message || error.message}`)
        }
    })
}

export default useCreateTask