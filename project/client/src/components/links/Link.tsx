import clsx from 'clsx'
import { LinkProps, Link as ReactLink } from 'react-router-dom'
import { usePathname } from '../../app/hooks'

function Link({ children, to, ...rest }: React.PropsWithChildren<LinkProps>) {
    const pathname = usePathname()

    return (
        <ReactLink className={
            clsx(pathname === to ? 'pointer-events-none' : "text-sm font-medium")
        }
            to={to}
            {...rest}
        >
            {children}
        </ReactLink>
    )
}

export default Link