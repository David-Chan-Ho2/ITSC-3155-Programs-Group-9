import { ITask } from "./tasks.types"

export default interface IProject {
    id: number
    name: string
    description: string
    mentor: number
    status: string
    tasks: ITask[]
    updated: string
    created: string
}
