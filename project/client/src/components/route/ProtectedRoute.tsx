import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const isAuthenticated = !!localStorage.getItem("access")
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute