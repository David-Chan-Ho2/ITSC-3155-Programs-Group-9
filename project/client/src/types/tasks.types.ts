export interface ITask {
    userId: number
    projectId: number
    id: number
    title: string
    description?: string
    completed: boolean
    updated: string
    created: string
}