import { useParams } from "react-router-dom"
import TaskList from "../features/tasks/TaskList"
import useProject from "../hooks/useProject"

function ProjectDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { data: project, isLoading, error } = useProject(Number(id))

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <p>{project?.name}</p>
            <TaskList projectId={Number(id)} />
        </div>
    )
}

export default ProjectDetailPage