import { useEffect } from "react"
import { NavLink, useLocation, useParams } from "react-router-dom"
import { useProject } from "../../app/hooks"
import { setProjectId } from "../../app/slices/projectSlice"
import CreateTask from "../../features/tasks/CreateTask"
import TaskList from "../../features/tasks/TaskList"
import Loading from "../../features/loading/Loading"

function ProjectDetailPage() {
    const { id } = useParams()
    const location = useLocation()
    const { data: project, isLoading, error } = useProject(Number(id))

    useEffect(() => {
        if (id) {
            setProjectId(Number(id))
        }
    }, [location.pathname])

    if (isLoading) return <Loading />
    if (error) return <p>Error: {error.message}</p>

    return (
        <>
            <div className="md:flex md:items-center md:justify-between mb-6">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {project?.name}
                    </h2>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <NavLink to={`/projects/${project.id}/edit`}>
                        <button
                            type="button"
                            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Edit
                        </button>
                    </NavLink>
                </div>
            </div>
            <TaskList tasks={project?.tasks} />
            <CreateTask projectId={project.id} />
        </>
    )
}

export default ProjectDetailPage