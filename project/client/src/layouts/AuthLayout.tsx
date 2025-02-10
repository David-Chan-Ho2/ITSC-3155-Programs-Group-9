import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import usePathname from "../hooks/usePathname"

interface IAuthHeader {
    title: string
    subtitle: string
    label: string
    to: string
}

function AuthHeader({ title, subtitle, label, to }: IAuthHeader) {
    return (
        <div>
            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
                {title}
            </h2>
            <p className="mt-2 text-sm/6 text-gray-500">
                {subtitle}{' '}
                <Link to={to} className="font-semibold text-indigo-600 hover:text-indigo-500">
                    {label}
                </Link>
            </p>
        </div>
    )
}

function AuthLayout({ children }: React.PropsWithChildren) {
    const pathname = usePathname()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("access")) {
            navigate("/")
        }
    }, [navigate])

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-sm lg:w-96">

                {pathname === '/login' ?
                    <AuthHeader
                        title='Log in to your account'
                        subtitle='Not a member already?'
                        label='Create an account'
                        to='/register'
                    /> :
                    <AuthHeader
                        title='Create your account'
                        subtitle='Already a member?'
                        label='Log in to your account'
                        to='/login'
                    />
                }

                <div className="mt-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout