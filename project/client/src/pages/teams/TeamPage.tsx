import { NavLink } from "react-router-dom"
import { useUsers } from "../../app/hooks"
import Avatar from "../../components/avatar/Avatar"

export default function TeamPage() {
    const { data, isLoading, error } = useUsers()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <table className="min-w-full divide-y divide-gray-300">
            <thead>
                <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                {data?.map((user) => (
                    <tr key={user.email}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="flex items-center">
                                <div className="size-11 shrink-0">
                                    <Avatar avatar='/default_avatar.png'/>
                                </div>
                                <div className="ml-4">
                                    <NavLink className="font-medium text-gray-900" to={`/users/${user.id}`}>{user.full_name}</NavLink>
                                    <div className="mt-1 text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <div className="text-gray-900">{user.role}</div>
                            <div className="mt-1 text-gray-500">{user.department}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                Active
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
