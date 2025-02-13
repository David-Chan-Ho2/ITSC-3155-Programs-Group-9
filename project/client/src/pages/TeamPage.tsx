import { useTeams } from "../app/hooks"

export default function TeamPage() {
    const { data, isLoading, error } = useTeams()

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
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                {data?.map((person) => (
                    <tr key={person.email}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="flex items-center">
                                <div className="size-11 shrink-0">
                                    <img alt="" src={person.image} className="size-11 rounded-full" />
                                </div>
                                <div className="ml-4">
                                    <div className="font-medium text-gray-900">{person.name}</div>
                                    <div className="mt-1 text-gray-500">{person.email}</div>
                                </div>
                            </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <div className="text-gray-900">{person.role}</div>
                            <div className="mt-1 text-gray-500">{person.department}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                Active
                            </span>
                        </td>
                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                Edit<span className="sr-only">, {person.name}</span>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
