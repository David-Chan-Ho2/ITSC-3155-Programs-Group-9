import { Select } from '@headlessui/react'
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, FormEvent, useState } from "react"
import { NavLink } from "react-router-dom"
import { useAppDispatch, useDeleteProject, useProjects } from "../../app/hooks"
import { setProjectId } from "../../app/slices/projectSlice"
import Button from "../../components/buttons/Button"
import Form from "../../components/forms/Form"
import IProject, { IProjectStatus } from "../../types/projects.types"

function ProjectPage() {
    const [search, setSearch] = useState('')
    const { data = [], isLoading, error, refetch, } = useProjects(search)
    const deleteProjectMutation = useDeleteProject()
    const dispatch = useAppDispatch()
    const projectStatus: string[] = Object.values(IProjectStatus)
    const [filterStatus, setFilterStatus] = useState('')
    const projects = filterStatus !== ''
        ? data?.filter((project) => project.status.toLowerCase() === filterStatus)
        : data

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const onDelete = (id: number) => {
        deleteProjectMutation.mutate(id)
    }

    const onLink = (id: number) => {
        dispatch(setProjectId(id))
    }

    const onReset = () => {
        setSearch('')
        refetch()
    }

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        refetch()
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const onStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(e.target.value)
    }

    // if (projects.length === 0) {
    //     return <EmptyState title="project" />
    // }

    return (
        <>
            <NavLink to="/projects/create">
                <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >

                    <PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5" />
                    New Project
                </button>
            </NavLink>

            <Form className="grid flex-1 grid-cols-1 outline outline-gray-300 p-3 mt-4" onSubmit={onSubmit}>
                <input
                    onChange={onSearch}
                    value={search}
                    name="search"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
                />
                <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                />
            </Form>

            <div className='flex items-center gap-3'>
                <label>Project Status</label>
                <Select name="status" aria-label="Project status" className="my-2" onChange={onStatus}>
                    <option value="">Status</option>
                    {projectStatus.map((status) => (
                        <option key={status} value={status.toLowerCase()}>{status}</option>
                    ))}
                </Select>
            </div>

            <Button className="mt-3" onClick={onReset}>Reset</Button>

            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                            Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Description
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Manager
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Delete</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {projects.map((project: IProject) => (
                        <tr key={project.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0  capitalize">
                                <NavLink to={`projects/${project.id}`}>
                                    {project.name}
                                </NavLink>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500  capitalize">{project.description}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{typeof project.manager === 'object' ? project.manager.full_name : project.manager}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500  capitalize">{project.status}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <Button>
                                    <NavLink to={`/projects/${project.id}/edit`}>
                                        Edit
                                    </NavLink>
                                </Button>
                            </td>
                            <td>
                                <Button className="bg-red-500 hover:bg-red-300" onClick={() => onDelete(Number(project.id))}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ProjectPage