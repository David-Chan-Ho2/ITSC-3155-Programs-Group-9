import { useMutation } from "@tanstack/react-query"
import { createProject } from "../api/projects.api"
import IProject from "../types/projects.types"

const useCreateProject = () => {
    return useMutation<void, Error, Omit<IProject, 'id'>>({
        mutationFn: (data) => createProject(data),
        onSuccess: (data) => {
            console.log('Create Project')
        },
        onError: (error: any) => {
            console.log(`Login failed: ${error.response?.data?.message || error.message}`)
        }
    })
}

export default useCreateProject