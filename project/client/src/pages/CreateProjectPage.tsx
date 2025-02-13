import { Button } from "@headlessui/react"
import { useNavigate } from "react-router-dom"
import { useCreateProject, useForm } from "../app/hooks"
import Form from "../components/forms/Form"
import Input from "../components/inputs/Input"
import IProject from "../types/projects.types"

function CreateProjectPage() {
    const navigate = useNavigate()
    const createProject = useCreateProject()

    const { form, handleChange, handleSubmit } = useForm({
        name: '',
        description: '',
    })

    const onSubmit = (formData: Omit<IProject, 'id'>) => {
        createProject.mutate(formData)
        navigate("/projects")
    }

    return (
        <div>
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
        </div>
    )
}

export default CreateProjectPage