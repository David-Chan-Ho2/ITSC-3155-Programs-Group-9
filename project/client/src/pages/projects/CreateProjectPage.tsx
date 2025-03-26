import { Button } from "@headlessui/react"
import { useNavigate } from "react-router-dom"
import { useAppSelector, useCreateProject, useForm } from "../../app/hooks"
import { selectUser } from "../../app/slices/userSlice"
import Form from "../../components/forms/Form"
import Input from "../../components/inputs/Input"
import Link from "../../components/links/Link"
import IProject from "../../types/projects.types"

function CreateProjectPage() {
    const navigate = useNavigate()
    const createProject = useCreateProject()
    const { userId } = useAppSelector(selectUser)

    const { form, handleChange, handleSubmit } = useForm({
        name: '',
        description: '',
        manager: userId
    })

    const onSubmit = (formData: Omit<IProject, 'id'>) => {
        createProject.mutate(formData)
    }

    return (
        <>
            <Link to="#" onClick={() => navigate(-1)}>Go Back</Link>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Name"
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Description"
                    id="description"
                    name="description"
                    type="text"
                    value={form.description}
                    onChange={handleChange}
                    required
                />
                <Button type="submit">
                    Create
                </Button>
            </Form>
        </>
    )
}

export default CreateProjectPage