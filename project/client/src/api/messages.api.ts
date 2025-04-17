import axios from 'axios'
import { IMessage } from '../types/messages.types'
import { BASE_URL } from './base.api'

const url = BASE_URL + 'messages/'

export async function getMessages(): Promise<IMessage[]> {
    const { data } = await axios.get(url)
    return data
}

export async function getMessage(id: number): Promise<IMessage> {
    const { data } = await axios.get(url + id)
    return data
}

export async function createMessage(id: number, message: Partial<IMessage>): Promise<void> {
    const { data } = await axios.post(`${BASE_URL}rooms/${id}/messages/`, message)
    return data
}

export async function updateMessage(id: number, message: Partial<IMessage>): Promise<IMessage> {
    const { data } = await axios.put(url + id, message)
    return data
}

export async function deleteMessage(id: number): Promise<void> {
    const { data } = await axios.delete(url + id)
    return data
}

