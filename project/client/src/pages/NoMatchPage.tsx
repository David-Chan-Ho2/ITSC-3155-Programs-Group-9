import { Link, useNavigate } from "react-router-dom"

function NoMatchPage() {
    const navigate = useNavigate()

    return (
        <>
            <p className="text-base/8 font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                Page not found
            </h1>
            <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10">
                <Link to="#" onClick={() => navigate(-1)} className="text-sm/7 font-semibold text-indigo-600">
                    Back to home
                </Link>
            </div>
        </>
    )
}

export default NoMatchPage