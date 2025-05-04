import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { logout } from "../../app/slices/authSlice"

function LogoutPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(logout())
        navigate('/')
    }, [])

    return (
        <div>Logging out...</div>
    )
}

export default LogoutPage