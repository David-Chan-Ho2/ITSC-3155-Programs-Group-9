import { Menu, MenuButton, MenuItems } from "@headlessui/react"
import { BellIcon } from "@heroicons/react/24/outline"

function Notifications() {
    return (
        <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5" disabled>
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
            </MenuButton>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2.5 p-3 w-72 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >

            </MenuItems>
        </Menu>
    )
}

export default Notifications