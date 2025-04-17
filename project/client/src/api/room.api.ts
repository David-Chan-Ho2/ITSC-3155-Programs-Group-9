import axios from "axios"
import { IRoom } from "../types/rooms.types"
import { BASE_URL } from "./base.api"

const url = BASE_URL + 'rooms/'

export async function getRoom(id: number): Promise<IRoom> {
    const { data } = await axios.get(`${url}${id}/`)
    return data
}
