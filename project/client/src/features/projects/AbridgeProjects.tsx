import { useUserProjects } from "../../app/hooks"
import IProject from "../../types/projects.types"

function AbridgeProjects() {
    const { data, isLoading, error } = useUserProjects(1)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>


    return (
        <table>
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