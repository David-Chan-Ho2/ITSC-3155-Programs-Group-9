import { NavLink } from "react-router-dom"
import Button from "../../components/buttons/Button"
import Link from "../../components/links/Link"
import IProject from "../../types/projects.types"

interface IProjectItem {
    project: IProject
    onLink: (id: number) => void
    onDelete: (id: number) => void
}

function ProjectItem({ project, onLink, onDelete }: IProjectItem) {
    return (
        <tr key={project.id}>
            <td>
                <Link to={`/projects/${project.id}`} onClick={() => onLink(project.id)}>{project.name}</Link>
            </td>
            <td>
                {project.description}
            </td>
            <td>
                {project.mentor}
            </td>
            <td>
                {project.status}
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
    )
}

export default ProjectItem