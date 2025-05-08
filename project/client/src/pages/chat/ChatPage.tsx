import { Button, Input } from "@headlessui/react"
import { useAppSelector, useCreateMessage, useForm, useMessages } from "../../app/hooks"
import { selectUser } from "../../app/slices/userSlice"
import Messages from "../../features/chat-channel/Messages"
import Loading from "../../features/loading/Loading"

function ChatPage() {
    const { userId } = useAppSelector(selectUser)
    const { data: messages, isLoading, error } = useMessages()
    const createMessage = useCreateMessage()
    const { handleSubmit, handleChange, form, resetForm } = useForm({
        user: userId,
        room: 3,
        body: ''
    })

    if (isLoading) return <Loading />
    if (error) return <p>Error: {error.message}</p>

    const onSubmit = () => {
        if (form.body) {
            createMessage.mutate(form)
            resetForm()
        }
    }

    return (
        <>
            <Messages messages={messages} />

            <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    value={form.body}
                    name="body"
                    onChange={handleChange}
                    placeholder="Type a message..."
                />
                <Button type='submit'>
                    Send
                </Button>
            </form>
        </>
    )
}

export default ChatPage