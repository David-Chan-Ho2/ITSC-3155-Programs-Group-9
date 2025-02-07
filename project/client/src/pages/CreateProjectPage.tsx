import { Button } from "@headlessui/react"
import { useNavigate } from "react-router-dom"
import Form from "../components/forms/Form"
import Input from "../components/inputs/Input"
import useCreateProject from "../hooks/useCreateProject"
import { useForm } from "../hooks/useForm"
import IProject from "../types/projects.types"

function CreateProjectPage() {
    const navigate = useNavigate()
    const create = useCreateProject()

    const { form, handleChange, handleSubmit } = useForm({
        name: ''
    })

    const onSubmit = (formData: Omit<IProject, 'id'>) => {
        console.log(formData)
        create.mutate(formData)
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
                    autoComplete="name" />
                <Button type="submit">
                    Create
                </Button>
            </Form>
        </div>
    )
}

export default CreateProjectPage