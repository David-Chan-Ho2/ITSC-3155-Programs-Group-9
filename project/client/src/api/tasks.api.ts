import axios from 'axios'
import { ITask } from "../types/tasks.types"
import { BASE_URL } from './base.api'

const url = BASE_URL + 'tasks/'

export async function getTask(id: number): Promise<ITask> {
    const { data } = await axios.get(`${url}${id}`)
    return data
}

export async function createTask(task: Partial<ITask>): Promise<void> {
    const { data } = await axios.post(url, task)
    return data
}

export async function updateTask(task: ITask): Promise<ITask> {
    const { data } = await axios.patch(`${url}${task.id}/`, task)
    return data
}

export async function deleteTask(id: number): Promise<void> {
    const { data } = await axios.delete(`${url}${id}/`)
    return data
}
