import { useQuery } from "@tanstack/react-query"
import { getProjects } from "../api/projects.api"
import IProject from "../types/projects.types"

const useProjects = () => {
    return useQuery<IProject[], Error>({ queryKey: ['products'], queryFn: getProjects })
}

export default useProjects