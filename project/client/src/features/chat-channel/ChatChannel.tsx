import { format } from 'date-fns'
import React from 'react'
import { useAppSelector, useCreateMessage, useForm, useMessages } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'
import Button from '../../components/buttons/Button'
import Input from '../../components/inputs/Input'
import MessageCard from './MessageCard'

const ChatChannel: React.FC = () => {
    const { userId } = useAppSelector(selectUser)
    const { data: messages, isLoading, error } = useMessages()
    const { mutate } = useCreateMessage()
    const { handleSubmit, handleChange, form, resetForm } = useForm({
        user: userId,
        room: 1,
        body: '',
        created: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        updated: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    })

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const onSubmit = () => {
        if (form.body) {
            mutate(form)
            resetForm()
        }
    }

    return (
        <>
            <h1 className="text-xl font-bold mb-3">#name</h1>
            <div className="h-96 overflow-y-auto border rounded-lg p-3 bg-gray-100">
                {messages.length === 0 ? (
                    <p className="text-gray-500">No messages yet. Start the conversation!</p>
                ) : (
                    messages.map((msg) => (
                        <MessageCard key={msg.id} message={msg} />
                    ))
                )}
            </div>

            <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    value={form.body}
                    name="body"
                    onChange={handleChange}
                    placeholder="Type a message..."
                />
                <Button type='submit' className="flex items-center gap-1">
                    Send
                </Button>
            </form>
        </>
    )
}

export default ChatChannel