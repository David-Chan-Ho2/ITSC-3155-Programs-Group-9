import axios from 'axios'
import { IAuth, IToken } from '../types/auth.types'
import { BASE_URL } from './base.api'

export async function registerUser(auth: IAuth): Promise<void> {
    await axios.post(BASE_URL + '/register', auth)
}

export async function loginUser(auth: IAuth): Promise<IToken> {
    const { data } = await axios.post<IToken>(`${BASE_URL}/token/`, auth, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return data
}