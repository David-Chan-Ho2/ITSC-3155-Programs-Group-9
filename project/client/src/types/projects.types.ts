import { ITask } from "./tasks.types"

export default interface IProject {
    id: number
    name: string
    description: string
    department: string
    team_members: number[]
    tasks: ITask[]
    mentor_id: number
    status: string
    updated: string
    created: string
}
