import axios from 'axios'
import { ITeam } from '../types/teams.types'
import { BASE_URL } from './base.api'

const url = BASE_URL + 'teams/'

export async function getTeams(): Promise<ITeam[]> {
    const { data } = await axios.get(url)
    return data
}

export async function getTeam(id: number): Promise<ITeam> {
    const { data } = await axios.get(url + id)
    return data
}

export async function updateTeam(id: number, team: Partial<ITeam>): Promise<ITeam> {
    const { data } = await axios.put(url + id, team)
    return data
}


