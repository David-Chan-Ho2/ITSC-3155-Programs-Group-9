import axios from 'axios'
import { IUser } from '../types/users.types'
import { BASE_URL } from './base.api'

const url = BASE_URL + '/users/'

export async function getUsers(): Promise<IUser[]> {
    const { data } = await axios.get(url)
    return data
}

export async function getUser(id: number): Promise<IUser> {
    const { data } = await axios.get(url + `${id}`)
    return data
}

export async function updateUser(id: number, user: Partial<IUser>): Promise<IUser> {
    const { data } = await axios.put(url + `${id}`, user)
    return data
}

export async function deleteUser(id: number): Promise<void> {
    const { data } = await axios.delete(url + `${id}`)
    return data
}

