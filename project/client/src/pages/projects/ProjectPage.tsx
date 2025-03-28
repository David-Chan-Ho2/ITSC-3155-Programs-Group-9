import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { NavLink } from "react-router-dom"
import { useAppDispatch, useDeleteProject, useProjects } from "../../app/hooks"
import { setProjectId } from "../../app/slices/projectSlice"
import Button from "../../components/buttons/Button"
import Link from "../../components/links/Link"
import CreateProjectButton from "../../features/projects/CreateProjectButton"
import EmptyProjects from "../../features/projects/EmptyProjects"
import IProject from "../../types/projects.types"

function ProjectPage() {
    const { data: projects, isLoading, error } = useProjects()
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

    if (projects.length === 0) {
        return <EmptyProjects />
    }

    return (
        <>
            <CreateProjectButton />

            <form action="#" method="GET" className="grid flex-1 grid-cols-1 outline outline-gray-300 p-3 mt-4">
                <input
                    name="search"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
                />
                <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                />
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                            Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Description
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Mentor
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                        </th>
                        <th className="px-3"></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {projects?.map((project: IProject) => (
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
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ProjectPage