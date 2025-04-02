import { Button } from "@headlessui/react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useForm, useTask, useUpdateTask } from "../../app/hooks"
import Form from "../../components/forms/Form"
import Input from "../../components/inputs/Input"
import TextArea from "../../components/inputs/TextArea"
import { ITask } from "../../types/tasks.types"

function TaskDetailPage() {
    const params = useParams()
    const navigate = useNavigate()
    const { data, isLoading, error } = useTask(Number(params.id))
    const updateTaskMutation = useUpdateTask(true)
    const { form, handleChange, handleSubmit } = useForm<ITask>({
        ...data
    })

    const onSubmit = () => {
        updateTaskMutation.mutate({ ...data, ...form })
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    return (
        <>
            <NavLink to="#" onClick={() => navigate(-1)}>Go back</NavLink>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input className="p-3" defaultValue={data?.title} form={data.title} name="title" onChange={handleChange} />
                <TextArea className="p-3" defaultValue={data?.description} form={data.description} name="description" onChange={handleChange} placeholder="Add a description" />

                <Button type="submit">Submit</Button>
            </Form>
        </>
    )
}

export default TaskDetailPage