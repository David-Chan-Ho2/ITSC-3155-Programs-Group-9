import useProjects from "../hooks/useProjects"
import IProject from "../types/projects.types"

function ProjectPage() {
    const { data, isLoading, error } = useProjects()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <ul>
            <a href="/projects/create">
                Add Project
            </a>

            {data?.map((project: IProject) => (
                <li key={project.id}>
                    <a href={`/projects/${project.id}`}>{project.name}</a>
                </li>
            ))}
        </ul>
    )
}

export default ProjectPage