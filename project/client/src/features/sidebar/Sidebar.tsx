import {
    CalendarIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const teams = [
    { id: 1, name: 'Heroicons', href: '/teams/', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '/teams/', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '/teams/', initial: 'W', current: false },
]

function Sidebar() {
    const { pathname } = useLocation()
    const [links, setLinks] = useState([
        { name: 'Home', to: '/', icons: HomeIcon },
        { name: 'Team', to: '/teams', icon: UsersIcon },
        { name: 'Project', to: '/projects', icon: FolderIcon },
        { name: 'Calendar', to: '/calendar', icon: CalendarIcon },
        { name: 'Documents', to: '/documents', icon: DocumentDuplicateIcon }
    ])
    const [activeLink, setActiveLink] = useState('/')

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                    <NavLink to="/">
                        <img
                            alt="Your Company"
                            src="https://placehold.co/16x16/EEE/31343C"
                            className="h-8 w-auto"
                        />
                    </NavLink>
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {links.map(link => (
                                    <li key={link.name}>
                                        <NavLink
                                            key={link.to}
                                            to={link.to}
                                            className={clsx(
                                                link.to === activeLink
                                                    ? 'bg-gray-50 text-indigo-600'
                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                            )}
                                            onClick={() => setActiveLink(link.to)}
                                        >
                                            <link.icon
                                                aria-hidden="true"
                                                className={clsx(
                                                    link.to === activeLink ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                    'size-6 shrink-0',
                                                )}
                                            />
                                            {link.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <div className="text-xs/6 font-semibold text-gray-400">Your teams</div>
                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                {teams.map((team) => (
                                    <li key={team.name}>
                                        <a
                                            href={team.href}
                                            className={clsx(
                                                team.current
                                                    ? 'bg-gray-50 text-indigo-600'
                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                            )}
                                        >
                                            <span
                                                className={clsx(
                                                    team.current
                                                        ? 'border-indigo-600 text-indigo-600'
                                                        : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                                    'flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                                                )}
                                            >
                                                {team.initial}
                                            </span>
                                            <span className="truncate">{team.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="mt-auto">
                            <a
                                href="#"
                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                            >
                                <Cog6ToothIcon
                                    aria-hidden="true"
                                    className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                />
                                Settings
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar