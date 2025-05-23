import { useParams } from "react-router-dom"
import { useUser } from "../../app/hooks"
import Avatar from "../../components/avatar/Avatar"
import Loading from "../../features/loading/Loading"

function UserDetailPage() {
    const params = useParams()
    const { data: user, isLoading, error } = useUser(Number(params.id))

    if (isLoading) return <Loading />
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <Avatar avatar={user.profile_picture} />
            <p>Name: {user.full_name}</p>
            <p>Role: {user.role}</p>
        </div>
    )
}

export default UserDetailPage