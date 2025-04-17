import { IMessage } from "./messages.types"

export interface IRoom {
    host: number
    messages: IMessage[]
    updated: string
    created: string
}