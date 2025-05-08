import { Button } from "@headlessui/react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useForm, useProject, useUpdateProject } from "../../app/hooks"
import Form from "../../components/forms/Form"
import Input from "../../components/inputs/Input"
import Loading from "../../features/loading/Loading"

function EditProjectPage() {
    const params = useParams()
    const { data, isLoading, error } = useProject(Number(params.id))
    const { form, handleChange, handleSubmit, resetForm } = useForm({
        name: '',
        description: '',
    })
    const updateProjectMutation = useUpdateProject()
    const navigate = useNavigate()

    if (isLoading) return <Loading />

    if (error) return <p>{error.message}</p>


    const onSubmit = () => {
        if (!form.description) {
            delete form.description
        }
        if (!form.name) {
            delete form.name
        }
        updateProjectMutation.mutate({ ...data, ...form })
        resetForm()
    }

    return (
        <>
            <NavLink to='#' onClick={() => navigate(-1)}>Go back</NavLink>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Name"
                    defaultValue={data?.name}
                    onChange={handleChange}
                    name="name"
                />
                <Input
                    label="Description"
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