import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom"
import { loginUser, registerUser } from "../api/auth.api"
import { getEvents } from "../api/events.api"
import { createProject, getProject, getProjects } from "../api/projects.api"
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../api/tasks.api"
import { getTeams } from "../api/teams.api"
import { login } from "../app/slices/authSlice"
import { IAuth, IToken } from "../types/auth.types"
import { IEvent } from "../types/events.types"
import IProject from "../types/projects.types"
import { ITask } from "../types/tasks.types"
import { ITeam } from "../types/teams.types"
import type { AppDispatch, RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


// Auth
const useLogin = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return useMutation<IToken, Error, IAuth>({
        mutationFn: (data) => loginUser(data),
        onSuccess: (data) => {
            dispatch(login(data))
            console.log('Login successful!')
            navigate("/", { replace: true })
        },
        onError: (error: any) => {
            console.log(`Login failed: ${error.response?.data?.message || error.message}`)
        }
    })
}

const useRegister = () => {
    const navigate = useNavigate()

    return useMutation<void, Error, IAuth>({
        mutationFn: (data) => registerUser(data),
        onSuccess: (data) => {
            console.log('Register successful!')
            navigate("/login", { replace: true })
        },
    })
}

export const useAuth = () => {
    const register = useRegister()
    const login = useLogin()

    return { register, login, }
}

// Project
export const useCreateProject = () => {
    return useMutation<void, Error, Omit<IProject, 'id'>>({
        mutationFn: (data) => createProject(data),
        onSuccess: (data) => {
            console.log('Create Project')
        },
        onError: (error: any) => {
            console.log(`Login failed: ${error.response?.data?.message || error.message}`)
        }
    })
}

export const useProject = (id: number) => {
    return useQuery<IProject, Error>({ queryKey: ['project', id], queryFn: () => getProject(id) })
}

export const useProjects = () => {
    return useQuery<IProject[], Error>({ queryKey: ['projects'], queryFn: getProjects })
}

// Task
export const useTasks = (projectId: number) => {
    return useQuery<ITask[], Error>({ queryKey: ['tasks', projectId], queryFn: () => getTasks(projectId) })
}

export const useTask = (taskId: number) => {
    return useQuery<ITask, Error>({ queryKey: ['task', taskId], queryFn: () => getTask(taskId) })
}

export const useCreateTask = () => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, Omit<ITask, 'id'>>({
        mutationFn: (newTask) => createTask(newTask),
        onSuccess: (_, createdTask) => {
            console.log('Create Task')
            queryClient.setQueryData(["tasks", createdTask.projectId], (oldTasks: ITask[] | undefined) => {
                return oldTasks ? [...oldTasks, createdTask] : [createdTask]
            })

            queryClient.invalidateQueries({ queryKey: ["tasks", createdTask.projectId] })
        },
        onError: (error: any) => {
            console.log(`Login failed: ${error.response?.data?.message || error.message}`)
        }
    })
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (task: Omit<ITask, 'userid'>) => updateTask(task),
        onSuccess: (_, task) => {
            queryClient.setQueryData(["tasks"], (oldTasks: ITask[] | undefined) => {
                return oldTasks?.map((t) => (t.id === task.id ? { ...t, ...task } : t)) || []
            })
            queryClient.invalidateQueries({ queryKey: ["tasks", task.projectId] })
        },
    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, number>({
        mutationFn: (taskId) => deleteTask(taskId),
        onSuccess: (_, taskId) => {
            console.log('Delete Task')
            queryClient.setQueryData(["tasks"], (oldTasks: ITask[] | undefined) => {
                if (!oldTasks) return []
                return oldTasks.filter((task) => task.id !== taskId)
            })
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
        onError: (error: any) => {
            console.log(`Login failed: ${error.response?.data?.message || error.message}`)
        }
    })
}

// Events
export const useEvents = () => {
    return useQuery<IEvent[], Error>({ queryKey: ['events'], queryFn: getEvents })
}

// Teams
export const useTeams = () => {
    return useQuery<ITeam[], Error>({ queryKey: ['teams'], queryFn: getTeams })
}

// Form
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

export const useLocalStorage = () => {
    const localStorage = window.localStorage

    const setItem = (key: string, value: string) => {
        localStorage.setItem(key, value)
    }

    const getItem = (key: string) => {
        const item = localStorage.getItem(key)

        if (!item) {
            return 'false'
        }

        return item
    }

    const removeItem = (key: string) => {
        localStorage.removeItem(key)
    }

    return { setItem, getItem, removeItem }
}

export const usePathname = () => {
    const { pathname } = useLocation()
    return pathname
}

