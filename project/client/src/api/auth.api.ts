import axios from 'axios'
import { IAuth, IToken } from '../types/auth.types'
import { BASE_URL } from './base.api'

export const registerUser = async (data: IAuth): Promise<void> => {
    await axios.post(BASE_URL + 'register', data)
}


export async function loginUser(data: IAuth): Promise<IToken> {
    const response = await axios.post<IToken>(`${BASE_URL}/login`, data)
    return response.data
}