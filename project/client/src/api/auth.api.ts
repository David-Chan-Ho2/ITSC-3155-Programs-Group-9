import axios from 'axios'
import { IAuth, IToken } from '../types/auth.types'
import { BASE_URL } from './base.api'

export async function registerUser(auth: IAuth): Promise<void> {
    await axios.post(BASE_URL + '/api/register/', auth)
}

export async function loginUser(auth: IAuth): Promise<IToken> {
    const { data } = await axios.post<IToken>(`${BASE_URL}/api/token/`, auth)
    localStorage.setItem("access", data.access)
    localStorage.setItem("refresh", data.refresh)
    return data
}

export const refreshToken = async () => {
    try {
        const refresh = localStorage.getItem("refresh")
        const response = await axios.post(`${BASE_URL}/refresh/`, { refresh })
        localStorage.setItem("access", response.data.access)
        return response.data.access
    } catch (error) {
        console.error("Token refresh failed", error)
        logout()
        throw error
    }
}

export const logout = () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
}