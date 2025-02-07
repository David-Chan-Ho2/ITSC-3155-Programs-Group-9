import useProjects from "../hooks/useProjects"
import IProject from "../types/projects.types"

function DashboardPage() {
  const { data, isLoading, error } = useProjects()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {data?.map((project: IProject) => (
        <li key={project.id}>
          <a href={`/projects/${project.id}`}>{project.name}</a>
        </li>))}
    </ul>
  )
}

export default DashboardPage