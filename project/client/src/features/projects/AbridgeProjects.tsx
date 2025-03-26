import { useUserProjects } from "../../app/hooks"
import Link from "../../components/links/Link"
import IProject from "../../types/projects.types"

interface IAbridgeProjects {
    userId: number
}

function AbridgeProjects({ userId }: IAbridgeProjects) {
    const { data, isLoading, error } = useUserProjects(userId)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <table className="text-left">
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((project: IProject) => (
                    <tr key={project.id}>
                        <td>
                            <Link to={`/projects/${project.id}`}>{project.name}</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}

export default AbridgeProjects