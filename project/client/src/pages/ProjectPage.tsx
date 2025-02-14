import { NavLink } from "react-router-dom"
import { useDeleteProject, useProjects } from "../app/hooks"
import Button from "../components/buttons/Button"
import IProject from "../types/projects.types"

function ProjectPage() {
    const { data, isLoading, error } = useProjects()
    const deleteProjectMutation = useDeleteProject()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const onDelete = (id: number) => {
        deleteProjectMutation.mutate(id)
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Host</th>
                        <th className="px-3"></th>
                        <th></th>
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
                            <td className="px-3">
                                <Button>
                                    <NavLink to={`/projects/${project.id}/update`}>
                                        Edit
                                    </NavLink>
                                </Button>
                            </td>
                            <td>
                                <Button className="bg-red-500 hover:bg-red-300" onClick={() => onDelete(Number(project.id))}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Button className="mt-10 bg-white outline outline-2 outline-gray-300 text-black hover:bg-gray-300">
                <NavLink to="/projects/create">Create Project</NavLink>
            </Button>
        </div>
    )
}

export default ProjectPage