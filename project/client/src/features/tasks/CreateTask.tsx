import { Button } from "@headlessui/react"
import { useAppSelector } from "../../app/hooks"
import { selectUser } from "../../app/slices/userSlice"
import Form from "../../components/forms/Form"
import Input from "../../components/inputs/Input"
import useCreateTask from "../../hooks/useCreateTask"
import { useForm } from "../../hooks/useForm"
import { ITask } from "../../types/tasks.types"

interface ICreateTask {
    projectId: number
}

function CreateTask({ projectId }: ICreateTask) {
    const { userId } = useAppSelector(selectUser)
    const createTask = useCreateTask()

    const { form, handleChange, handleSubmit } = useForm<Omit<ITask, 'id'>>({
        userId,
        projectId,
        title: '',
        completed: false,
        shown: true
    })

    const onSubmit = () => {
        console.log(form)
        createTask.mutate(form)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input label="Title" value={form.title} name="title" onChange={handleChange} />
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default CreateTask