import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useCreateMessage, useForm, useRoom } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'
import Button from '../../components/buttons/Button'
import Input from '../../components/inputs/Input'
import Messages from './Messages'

const ChatChannel: React.FC = () => {
    const params = useParams()
    const roomId = Number(params.id)
    const { userId } = useAppSelector(selectUser)
    const { data: room, isLoading, error } = useRoom(roomId)
    const createMessage = useCreateMessage(roomId)
    const { handleSubmit, handleChange, form, resetForm } = useForm({
        user: userId,
        room: roomId,
        body: ''
    })


    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const onSubmit = () => {
        if (form.body) {
            createMessage.mutate(form)
            resetForm()
        }
    }

    return (
        <>
            <Messages messages={room.messages} />

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