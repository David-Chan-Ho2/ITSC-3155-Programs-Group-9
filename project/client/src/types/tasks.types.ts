export interface ITask {
    user: number
    project: number
    id: number
    title: string
    description?: string
    completed: boolean
    updated: string
    created: string
}