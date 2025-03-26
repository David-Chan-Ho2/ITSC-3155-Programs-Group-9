import { NavLink } from "react-router-dom"
import { useAppDispatch, useDeleteProject, useProjects } from "../../app/hooks"
import { setProjectId } from "../../app/slices/projectSlice"
import Button from "../../components/buttons/Button"
import Link from "../../components/links/Link"
import IProject from "../../types/projects.types"

function ProjectPage() {
    const { data, isLoading, error } = useProjects()
    const deleteProjectMutation = useDeleteProject()
    const dispatch = useAppDispatch()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const onDelete = (id: number) => {
        deleteProjectMutation.mutate(id)
    }

    const onLink = (id: number) => {
        dispatch(setProjectId(id))
    }

    return (
        <>
            <Button className="mb-10">
                <NavLink to="/projects/create">Create Project</NavLink>
            </Button>

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
                                <Link to={`/projects/${project.id}`} onClick={() => onLink(project.id)}>{project.name}</Link>
                            </td>
                            <td>
                                {project.description}
                            </td>
                            <td className="px-3">
                                <Button>
                                    <NavLink to={`/projects/${project.id}/edit`}>
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
        </>
    )
}

export default ProjectPage