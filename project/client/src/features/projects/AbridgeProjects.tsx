import { useAppSelector, useUserProjects } from "../../app/hooks"
import { selectUser } from "../../app/slices/userSlice"
import IProject from "../../types/projects.types"

function AbridgeProjects() {
    const { userId } = useAppSelector(selectUser)
    const { data, isLoading, error } = useUserProjects(userId)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <table className="text-left">
            <caption>Projects</caption>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((project: IProject) => (
                    <tr key={project.id}>
                        <td>
                            <a href={`/projects/${project.id}`}>{project.name}</a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}

export default AbridgeProjects