import { ITask } from "./tasks.types"
import { IUser } from "./user.types"

export default interface IProject {
    id: number
    name: string
    description: string
    mentor: number
    status: string
    tasks: ITask[]
    manager: IUser | number
    members: IUser[] | number[]
    updated: string
    created: string
}

export enum IProjectStatus {
    PLANNED = 'Planned',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    ON_HOLD = 'On Hold'
}