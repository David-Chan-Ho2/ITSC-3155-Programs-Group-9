import { Button } from "@headlessui/react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useForm, useProject, useUpdateProject } from "../../app/hooks"
import Form from "../../components/forms/Form"
import Input from "../../components/inputs/Input"

function EditProjectPage() {
    const params = useParams()
    const { data, isLoading, error } = useProject(Number(params.id))
    const { form, handleChange, handleSubmit } = useForm({
        name: '',
        description: '',
    })
    const updateProjectMutation = useUpdateProject()
    const navigate = useNavigate()

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error.message}</p>
    }

    const onSubmit = () => {
        updateProjectMutation.mutate({ ...data, ...form })
    }

    return (
        <>
            <NavLink to='#' onClick={() => navigate(-1)}>Go back</NavLink>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    defaultValue={data?.name}
                    onChange={handleChange}
                    name="name"
                />
                <Input
                    defaultValue={data?.description}
                    onChange={handleChange}
                    name="description"
                />

                <Button type="submit">Submit</Button>
            </Form>
        </>
    )
}

export default EditProjectPage