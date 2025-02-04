import clsx from 'clsx'
import { LinkProps, Link as ReactLink } from 'react-router-dom'
import usePathname from '../../hooks/usePathname'

function Link({ to, ...rest }: LinkProps) {
    const pathname = usePathname()

    return (
        <ReactLink className={
            clsx(pathname === to ? 'pointer-events-none' : "text-sm font-medium")
        }
            to={to}
            {...rest}
        >
            Log in
        </ReactLink>
    )
}

export default Link