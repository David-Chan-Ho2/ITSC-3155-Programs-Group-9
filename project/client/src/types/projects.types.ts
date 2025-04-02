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


export enum IProjectStatus {
    PLANNED = 'Planned',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    ON_HOLD = 'On Hold'
}