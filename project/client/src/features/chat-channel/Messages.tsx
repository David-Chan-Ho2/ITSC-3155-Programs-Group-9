import { useEffect, useRef } from 'react'
import { IMessage } from '../../types/messages.types'
import MessageCard from './MessageCard'

interface IMessages {
    messages: IMessage[]
}

function Messages({ messages }: IMessages) {
    const bottomRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="h-96 overflow-y-auto border rounded-lg p-3 bg-gray-100">
            {messages.length === 0 ? (
                <p className="text-gray-500">No messages yet. Start the conversation!</p>
            ) : (
                messages.map((msg) => (
                    <MessageCard key={msg.id} message={msg} />
                ))
            )}
            <div ref={bottomRef} />
        </div>
    )
}

export default Messages