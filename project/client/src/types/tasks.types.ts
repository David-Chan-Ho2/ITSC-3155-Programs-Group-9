export interface ITask {
    id: number
    user: number
    project: number
    title: string
    description?: string
    completed: boolean
    updated: string
    created: string
}
