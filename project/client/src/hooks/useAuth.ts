import { useMutation } from "@tanstack/react-query"
import { loginUser, registerUser } from "../api/auth.api"
import { useAppDispatch } from "../app/hooks"
import { login } from "../app/slices/authSlice"
import { IAuth, IToken } from "../types/auth.types"

const useLogin = () => {
    const dispatch = useAppDispatch()

    return useMutation<IToken, Error, IAuth>({
        mutationFn: (data) => loginUser(data),
        onSuccess: (data) => {
            dispatch(login(data))
            console.log('Login successful!')
        },
        onError: (error: any) => {
            console.log(`Login failed: ${error.response?.data?.message || error.message}`)
        }
    })
}

const useRegister = () => {
    return useMutation<void, Error, IAuth>({
        mutationFn: (data) => registerUser(data),
    })
}

export const useAuth = () => {
    const register = useRegister()
    const login = useLogin()

    return { register, login, }
}