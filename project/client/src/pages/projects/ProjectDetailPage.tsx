import { useParams } from "react-router-dom"
import { useProject } from "../../app/hooks"
import CreateTask from "../../features/tasks/CreateTask"
import TaskList from "../../features/tasks/TaskList"

function ProjectDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { data: project, isLoading, error } = useProject(Number(id))

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <>
            <p>{project?.name}</p>
            <TaskList tasks={project?.tasks} />
            <CreateTask projectId={Number(id)} />
        </>
    )
}

export default ProjectDetailPage