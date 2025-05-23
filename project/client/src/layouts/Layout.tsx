import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
    Bars3Icon,
    ChatBubbleLeftIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    UsersIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector, usePathname, useProjects, useUser } from '../app/hooks'
import { setProjectId } from '../app/slices/projectSlice'
import { selectUser } from '../app/slices/userSlice'
import Avatar from '../components/avatar/Avatar'
import Button from '../components/buttons/Button'
import Logo from '../components/logo/Logo'
import Loading from '../features/loading/Loading'

interface ILink {
    name: string
    href: string
    icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string
        titleId?: string
    } & React.RefAttributes<SVGSVGElement>>
    current: boolean
}

function Layout() {
    const { userId } = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const { data: user, isLoading, error } = useUser(userId)
    const pathname = usePathname()
    const { data: projects = [], isLoading: projectLoading, error: projectError, refetch } = useProjects()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [navigation, setNavigation] = useState<ILink[]>([
        { name: 'Chat', href: `/chat`, icon: ChatBubbleLeftIcon, current: false },
        { name: 'Team', href: `/teams`, icon: UsersIcon, current: false },
        // { name: 'Calendar', href: `/calendar`, icon: CalendarIcon, current: false },
        { name: 'Documents', href: `/documents`, icon: DocumentDuplicateIcon, current: false },
    ])

    const userNavigation = [
        { name: 'Your profile', href: `/users/${userId}` },
        { name: 'Sign out', href: '/logout' },
    ]

    const onLink = (projectId: number) => {
        dispatch(setProjectId(projectId))
    }

    if (projectLoading) return <Loading />
    if (projectError) return <p>Error: {projectError.message}</p>

    return (
        <div>
            <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 flex">
                    <DialogPanel
                        transition
                        className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                    >
                        <TransitionChild>
                            <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                <Button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                                </Button>
                            </div>
                        </TransitionChild>
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                            <div className="flex h-16 shrink-0 items-center">
                                <Logo />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        {/* <ul role="list" className="-mx-2 space-y-1">
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className={clsx(
                                                            item.href === active
                                                                ? 'bg-gray-50 text-indigo-600'
                                                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                        )}
                                                        onClick={() => setActive(item.href)}
                                                    >
                                                        <item.icon
                                                            aria-hidden="true"
                                                            className={clsx(
                                                                item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                                'size-6 shrink-0',
                                                            )}
                                                        />
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul> */}
                                    </li>

                                    <li className="mt-auto">
                                        <a
                                            href="/settings"
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
                    </DialogPanel>
                </div>
            </Dialog>
            {pathname !== '/' &&
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">

                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <Logo />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        <li className='group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'>
                                            <FolderIcon
                                                aria-hidden="true"
                                                className='size-6 shrink-0'
                                            />
                                            Projects
                                            <Button>
                                                <NavLink to="/projects/create" className="align-right">Create</NavLink>
                                            </Button>
                                        </li>
                                        {projects.map((project) => (
                                            <li key={project.name} className='group flex gap-x-3   rounded-md p-2 pl-6 text-sm/6 font-semibold'>
                                                <Link
                                                    to={`/projects/${project.id}`}
                                                    onClick={() => onLink(project.id)}
                                                >
                                                    {project.name}
                                                </Link>
                                            </li>
                                        ))}
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    to={item.href}
                                                    className={clsx(
                                                        item.current
                                                            ? 'bg-gray-50 text-indigo-600'
                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                    )}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className={clsx(
                                                            item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                            'size-6 shrink-0',
                                                        )}
                                                    />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-auto">
                                    <a
                                        href="/settings"
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
            }

            <div className={pathname === '/' ? "" : "lg:pl-72"}>
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <Button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </Button>

                    {/* Separator */}
                    <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <form action="#" method="GET" className="grid flex-1 grid-cols-1">
                        </form>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative">
                                <MenuButton className="-m-1.5 flex items-center p-1.5">
                                    <span className="sr-only">Open user menu</span>
                                    <Avatar
                                        avatar='/default_avatar.png'
                                    />
                                    <span className="hidden lg:flex lg:items-center">
                                        <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">
                                            {user?.full_name}
                                        </span>
                                        <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
                                    </span>
                                </MenuButton>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    {userNavigation.map((item) => (
                                        <MenuItem key={item.name}>
                                            <NavLink
                                                to={item.href}
                                                className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                                            >
                                                {item.name}
                                            </NavLink>
                                        </MenuItem>
                                    ))}
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>

                <main className="py-4 px-4 sm:px-6 lg:px-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout