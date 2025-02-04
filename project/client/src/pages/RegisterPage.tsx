import Button from "../components/buttons/Button"
import Form from "../components/forms/Form"
import Input from "../components/inputs/Input"
import { useAuth } from "../hooks/useAuth"
import { useForm } from "../hooks/useForm"
import { IRegister } from "../types/auth.types"

function RegisterPage() {
    const initForm = { email: '', password: '', password2: '' }

    const { form, handleChange, handleSubmit } = useForm(initForm)

    const { register } = useAuth()

    const onSubmit = (formData: IRegister) => {
        register.mutate(formData)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Email Address"
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email" />
            <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password" />
            <Input
                label="Confirm Password"
                id="password"
                type="password"
                value={form.password2}
                onChange={handleChange}
                required
                autoComplete="current-password" />
            <Button disabled={register.isPending}>{register.isPending ? 'Loading...' : 'Register'}</Button>
        </Form>

    )
}

export default RegisterPage