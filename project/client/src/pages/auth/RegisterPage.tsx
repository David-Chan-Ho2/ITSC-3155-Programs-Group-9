import { useAuth, useForm } from "../../app/hooks"
import Button from "../../components/buttons/Button"
import Form from "../../components/forms/Form"
import Input from "../../components/inputs/Input"
import AuthLayout from "../../layouts/AuthLayout"
import { IRegister } from "../../types/auth.types"

function RegisterPage() {
    const initForm = { email: '', password: '', password2: '' }

    const { form, handleChange, handleSubmit } = useForm(initForm)

    const { register } = useAuth()

    const onSubmit = (formData: IRegister) => {
        register.mutate(formData)
    }

    return (
        <AuthLayout>
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
                    id="password2"
                    name="password2"
                    type="password"
                    value={form.password2}
                    onChange={handleChange}
                    required
                    autoComplete="current-password" />
                <Button type="submit" disabled={register.isPending}>{register.isPending ? 'Loading...' : 'Register'}</Button>
            </Form>
        </AuthLayout>
    )
}

export default RegisterPage