import { MenuItem } from "@headlessui/react"
import Avatar from "../../components/avatar/Avatar"
import { INotification } from "../../types/notification.types"

function Notification({ ...notification }: INotification) {
    const user = {
        id: 3,
        name: "Charlie Davis",
        email: "charlie.davis@student.edu",
        department: "Mechanical Engineering",
        role: "Designer",
        image: "https://randomuser.me/api/portraits/men/12.jpg",
        projects: [
            1
        ]
    }

    return (
        <MenuItem key={'messages-' + notification.id} >
            <div className="flex items-center">
                <div className="flex">
                    <Avatar avatar={user.image} />
                    <p>{notification.created}</p>
                </div>
                <a
                    href={notification.href}
                    className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                >
                    {notification.message}
                </a>
            </div>
        </MenuItem>
    )
}

export default Notification