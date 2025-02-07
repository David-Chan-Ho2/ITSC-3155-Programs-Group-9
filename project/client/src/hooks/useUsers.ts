import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../api/users.api"
import { IUser } from "../types/users.types"

const useUsers = () => {
    return useQuery<IUser[], Error>({ queryKey: ['products'], queryFn: getUsers })
}

export default useUsers