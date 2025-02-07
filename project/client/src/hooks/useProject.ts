import { useQuery } from "@tanstack/react-query"
import { getProject } from "../api/projects.api"
import IProject from "../types/projects.types"

const useProject = (id: number) => {
    return useQuery<IProject, Error>({ queryKey: ['product', id], queryFn: () => getProject(id) })
}

export default useProject