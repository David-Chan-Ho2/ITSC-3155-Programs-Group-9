import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { loginUser, registerUser } from "../api/auth.api"
import { useAppDispatch } from "../app/hooks"
import { login } from "../app/slices/authSlice"
import { IAuth, IToken } from "../types/auth.types"

const useLogin = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return useMutation<IToken, Error, IAuth>({
        mutationFn: (data) => loginUser(data),
        onSuccess: (data) => {
            dispatch(login(data))
            console.log('Login successful!')
            navigate("/", { replace: true })
        },
        onError: (error: any) => {
            console.log(`Login failed: ${error.response?.data?.message || error.message}`)
        }
    })
}

const useRegister = () => {
    const navigate = useNavigate()

    return useMutation<void, Error, IAuth>({
        mutationFn: (data) => registerUser(data),
        onSuccess: (data) => {
            console.log('Register successful!')
            navigate("/login", { replace: true })
        },
    })
}

export const useAuth = () => {
    const register = useRegister()
    const login = useLogin()

    return { register, login, }
}