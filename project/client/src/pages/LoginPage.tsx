import { Link } from "react-router-dom"
import Button from "../components/buttons/Button"
import Form from "../components/forms/Form"
import Input from "../components/inputs/Input"
import { useAuth } from "../hooks/useAuth"
import { useForm } from "../hooks/useForm"
import { IAuth } from "../types/auth.types"

function LoginPage() {
    const initForm = { email: '', password: '' }

    const { form, handleChange, handleSubmit } = useForm(initForm)

    const { login } = useAuth()

    const onSubmit = (formData: IAuth) => {
        login.mutate(formData)
        console.log(formData)
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

            <div className="flex items-center justify-between">
                <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                            />
                            <svg
                                fill="none"
                                viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                            >
                                <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                />
                                <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                />
                            </svg>
                        </div>
                    </div>
                    <label htmlFor="remember-me" className="block text-sm/6 text-gray-900">
                        Remember me
                    </label>
                </div>

                <div className="text-sm/6">
                    <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                    </Link>
                </div>
            </div>

            <Button type="submit" disabled={login.isPending}>
                {login.isPending ? 'Loading...' : 'Log in'}
            </Button>
        </Form>
    )
}

export default LoginPage