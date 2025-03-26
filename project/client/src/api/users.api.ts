import axios from "axios"
import IProject from "../types/projects.types"
import { IUser } from "../types/user.types"
import { BASE_URL } from "./base.api"

const url = BASE_URL + 'users/'

export async function getUsers(): Promise<IUser[]> {
    const { data } = await axios.get(url)
    return data
}

export async function getUser(userId: number): Promise<IUser> {
    const { data } = await axios.get(url + userId)
    return data
}

export async function getUserProjects(userId: number): Promise<IProject[]> {
    const { data } = await axios.get(url + userId)
    const projects = data['projects']
    const updatedData = []

    for (let project of projects) {
        const { data } = await axios.get(BASE_URL + 'projects/' + Number(project))
        updatedData.push(data)
    }

    return updatedData
}

