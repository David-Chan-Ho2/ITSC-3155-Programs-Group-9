import { NavLink } from "react-router-dom"
import { useProjects } from "../app/hooks"
import IProject from "../types/projects.types"

function ProjectPage() {
    const { data, isLoading, error } = useProjects()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Host</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((project: IProject) => (
                        <tr key={project.id}>
                            <td>
                                <a href={`/projects/${project.id}`}>{project.name}</a>
                            </td>
                            <td>
                                {project.description}
                            </td>
                            <td>
                                {project.name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <NavLink to="/projects/create">Create Project</NavLink>
        </div>
    )
}

export default ProjectPage