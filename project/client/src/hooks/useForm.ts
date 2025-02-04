import { useState } from 'react'

export const useForm = <T extends Record<string, any>>(initialState: T) => {
    const [form, setForm] = useState<T>(initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (onSubmit: (form: T) => void) => (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(form)
        resetForm()
    }

    const resetForm = () => setForm(initialState)

    return { form, handleChange, handleSubmit, resetForm }
}
