import axios from 'axios'
import { IEvent } from '../types/events.types'
import { BASE_URL } from './base.api'

const url = BASE_URL + '/events/'

export async function getEvents(): Promise<IEvent[]> {
    const { data } = await axios.get(url)
    return data
}

export async function getEvent(id: number): Promise<IEvent> {
    const { data } = await axios.get(url + `${id}`)
    return data
}

export async function createEvent(event: Partial<IEvent>): Promise<void> {
    await axios.post(url, event)
}

export async function updateEvent(id: number, event: Partial<IEvent>): Promise<IEvent> {
    const { data } = await axios.put(url + `${id}`, event)
    return data
}

export async function deleteEvent(id: number): Promise<void> {
    const { data } = await axios.delete(url + `${id}`)
    return data
}

