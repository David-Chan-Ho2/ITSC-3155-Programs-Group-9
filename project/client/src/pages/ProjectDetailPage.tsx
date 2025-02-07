import { useParams } from "react-router-dom"
import useProject from "../hooks/useProject"

function ProjectDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading, error } = useProject(Number(id))

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <p>{data?.name}</p>
        </div>
    )
}

export default ProjectDetailPage