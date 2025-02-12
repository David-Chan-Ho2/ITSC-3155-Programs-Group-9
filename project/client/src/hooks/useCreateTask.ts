import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTask } from "../api/tasks.api"
import { ITask } from "../types/tasks.types"

const useCreateTask = () => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, Omit<ITask, 'id'>>({
        mutationFn: (newTask) => createTask(newTask),
        onSuccess: (_, createdTask) => {
            console.log('Create Task')
            queryClient.setQueryData(["tasks", createdTask.projectId], (oldTasks: ITask[] | undefined) => {
                return oldTasks ? [...oldTasks, createdTask] : [createdTask];
            })

            queryClient.invalidateQueries({ queryKey: ["tasks", createdTask.projectId] });
        },
        onError: (error: any) => {
            console.log(`Login failed: ${error.response?.data?.message || error.message}`)
        }
    })
}

export default useCreateTask