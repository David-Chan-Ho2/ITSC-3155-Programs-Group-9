import axios from 'axios'
import { ITask } from "../types/tasks.types"
import { BASE_URL } from './base.api'

const url = BASE_URL + '/tasks'

export async function getTasks(projectId: number): Promise<ITask[]> {
    const { data } = await axios.get(url + "?projectId=" + projectId)
    return data
}

export async function getTask(id: number): Promise<ITask> {
    const { data } = await axios.get(url + `${id}`)
    return data
}

export async function createTask(task: Partial<ITask>): Promise<void> {
    await axios.post(url, task)
}

export async function updateTask(task: ITask): Promise<ITask> {
    console.log(url + `/${task.id}`)
    const { data } = await axios.patch(url + `/${task.id}`, task)
    return data
}

export async function deleteTask(id: number): Promise<void> {
    const { data } = await axios.delete(url + `${id}`)
    return data
}
