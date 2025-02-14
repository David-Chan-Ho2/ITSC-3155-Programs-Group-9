import axios from "axios"
import IProject from "../types/projects.types"
import { BASE_URL } from "./base.api"

const url = BASE_URL + 'users/'

export async function getUserProjects(userId: number): Promise<IProject[]> {
    const { data } = await axios.get(url + userId)
    const projects = data['projects']
    const updatedData: Set<IProject> = new Set()
    for (let project of projects) {
        const { data } = await axios.get(BASE_URL + 'projects/' + Number(project))
        updatedData.add(data)
    }
    return Array.from(updatedData)
}

