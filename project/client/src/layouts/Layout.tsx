import { Outlet } from "react-router-dom"
import Navbar from "../features/navbar/Navbar"

function Layout() {
    return (
        <>
            <Navbar />
            <main className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-12 sm:py-20 lg:px-8">
                <Outlet />
            </main>
        </>
    )
}

export default Layout