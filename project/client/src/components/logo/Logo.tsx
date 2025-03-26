import {
    ClipboardIcon
} from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

function Logo() {
    return (
        <NavLink to="/">
            <ClipboardIcon className="h-8 w-auto" />
        </NavLink>
    )
}

export default Logo