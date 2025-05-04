import { formatDistanceToNow } from 'date-fns'
import { useUser } from "../../app/hooks"
import Avatar from "../../components/avatar/Avatar"
import Link from '../../components/links/Link'
import { IMessage } from "../../types/messages.types"

interface IMessageCard {
  message: IMessage
}

function MessageCard({ message }: IMessageCard) {
  const { data: user, isLoading, error } = useUser(message.user)
  const messageTime = new Date(message.created)
  const relativeTime = formatDistanceToNow(messageTime, { addSuffix: true })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="mb-2">
      <div className="flex gap-2 p-3">
        <div className="flex items-center">
          <Avatar avatar={user?.profile_picture} />
        </div>
        <div>
          <div className='flex align-center gap-3'>
            <Link className="font-bold" to={`/users/${user?.id}`}>{user?.full_name}</Link>
            <span className="text-gray-400 text-sm">{relativeTime}</span>
          </div>
          <p>{message.body}</p>
        </div>
      </div>
    </div>
  )
}

export default MessageCard