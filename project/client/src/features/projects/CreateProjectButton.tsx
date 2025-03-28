import { PlusIcon } from '@heroicons/react/20/solid'
import { NavLink } from 'react-router-dom'

function CreateProjectButton() {
    return (
        <NavLink to="/projects/create">
            <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >

                <PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5" />
                New Project
            </button>
        </NavLink>
    )
}

export default CreateProjectButton