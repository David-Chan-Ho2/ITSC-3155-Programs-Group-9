import clsx from 'clsx'
import { useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from '../../app/hooks'
import { logout, selectAuth } from "../../app/slices/authSlice"

function Navbar() {
    const dispatch = useAppDispatch()
    const { isAuth } = useSelector(selectAuth)
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const onLogout = () => {
        dispatch(logout())
        navigate("/")
    }

    return (
        <header className="relative z-10">
            <nav aria-label="Top">
                <div className="mx-auto flex h-10 max-w-7xl items-center justify-end px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-6">
                        {isAuth ?
                            <Link to="/" onClick={onLogout} className="text-sm font-medium">
                                Log out
                            </Link> :
                            <>
                                <Link to="/login" className={clsx(pathname === '/login' ? 'pointer-events-none' : "text-sm font-medium")}>
                                    Log in
                                </Link>
                                <Link to="/register" className={clsx(pathname === '/register' ? 'pointer-events-none' : "text-sm font-medium")}>
                                    Create an account
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar