import axios from 'axios'
import IProject from "../types/projects.types"
import { BASE_URL } from './base.api'

const url = BASE_URL + 'projects/'

export async function getProjects(): Promise<IProject[]> {
    const { data } = await axios.get(url)
    return data
}

export async function getProject(id: number): Promise<IProject> {
    const { data } = await axios.get(url + id)
    return data
}

export async function createProject(project: Partial<IProject>): Promise<void> {
    const { data } = await axios.post(url, project)
    return data
}

export async function updateProject(id: number, project: Partial<IProject>): Promise<IProject> {
    const { data } = await axios.put(url + id, project)
    return data
}

export async function deleteProject(id: number): Promise<void> {
    const { data } = await axios.delete(url + id)
    return data
}

