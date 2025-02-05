import { useNavigate } from "react-router-dom"

export const useRedirect = () => {
    const navigate = useNavigate()
    return navigate
}

export default useRedirect 