import { Button } from "@headlessui/react"
import { PlusIcon } from "@heroicons/react/24/solid"
import { useAppSelector, useCreateTask, useForm } from "../../app/hooks"
import { selectUser } from "../../app/slices/userSlice"
import Form from "../../components/forms/Form"
import Input from "../../components/inputs/Input"
import { ITask } from "../../types/tasks.types"

interface ICreateTask {
    projectId: number
}

function CreateTask({ projectId }: ICreateTask) {
    const { userId } = useAppSelector(selectUser)
    const createTask = useCreateTask()

    const { form, handleChange, handleSubmit } = useForm<Partial<ITask>>({
        user: userId,
        project: projectId,
        title: '',
        completed: false,
    })

    const onSubmit = () => {
        if (form.title.trim() !== '') {
            createTask.mutate(form)
        }
    }

    return (
        <Form className="flex gap-3 items-center" onSubmit={handleSubmit(onSubmit)}>
            <Input value={form.title} name="title" onChange={handleChange} />
            <Button type="submit" className="h-8 w-8 border outline-gray-400">
                <PlusIcon className="text-gray-500" />
            </Button>
        </Form>
    )
}

export default CreateTask