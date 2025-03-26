import { MenuItem } from "@headlessui/react"
import Avatar from "../../components/avatar/Avatar"
import Link from "../../components/links/Link"
import { INotification } from "../../types/notification.types"

function Notification({ ...notification }: INotification) {
    const user = {
        id: 3,
        name: "Charlie Davis",
        email: "charlie.davis@student.edu",
        department: "Mechanical Engineering",
        role: "Designer",
        profile_picture: "https://randomuser.me/api/portraits/men/12.jpg"
    }

    return (
        <MenuItem key={'messages-' + notification.id} >
            <div className="flex items-center">
                <div className="flex">
                    <Avatar avatar={user.profile_picture} />
                    <p>{notification.created}</p>
                </div>
                <Link
                    to={notification.href}
                    className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                >
                    {notification.message}
                </Link>
            </div>
        </MenuItem>
    )
}

export default Notification