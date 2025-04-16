import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom"
import { loginUser, registerUser } from "../api/auth.api"
import { getDocument, getDocuments } from "../api/documents.api"
import { getEvents } from "../api/events.api"
import { createMessage, getMessages } from "../api/messages.api"
import { createProject, deleteProject, getProject, getProjects, updateProject } from "../api/projects.api"
import { createTask, deleteTask, getTask, updateTask } from "../api/tasks.api"
import { getTeams } from "../api/teams.api"
import { getUser, getUserProjects, getUsers } from '../api/users.api'
import { login } from "../app/slices/authSlice"
import { IAuth, IToken } from "../types/auth.types"
import { IDocument } from "../types/documents.types"
import { IEvent } from "../types/events.types"
import { IMessage } from "../types/messages.types"
import IProject from "../types/projects.types"
import { ITask } from "../types/tasks.types"
import { ITeam } from "../types/teams.types"
import { IUser } from "../types/user.types"
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
    const navigate = useNavigate()

    return useMutation<void, Error, Partial<IProject>>({
        mutationFn: (data) => createProject(data),
        onSuccess: (data) => {
            navigate(-1)
        },
        onError: (error: any) => {
            console.log(`Login failed: ${error.response?.data?.message || error.message}`)
        }
    })
}

export const useProject = (id: number) => {
    return useQuery<IProject, Error>({ queryKey: ['project', id], queryFn: () => getProject(id) })
}

export const useProjects = (search: string = '') => {
    return useQuery<IProject[], Error>({ queryKey: ['projects'], queryFn: () => getProjects(search), refetchIntervalInBackground: false, refetchOnWindowFocus: false, gcTime: 0 })
}

export const useUpdateProject = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (project: IProject) => updateProject(project),
        onSuccess: (_, project) => {
            queryClient.setQueryData(["projects"], (oldProjects: IProject[] | undefined) => {
                return oldProjects?.map((t) => (t.id === project.id ? { ...t, ...project } : t)) || []
            })
            queryClient.invalidateQueries({ queryKey: ["projects", project.id] })
            queryClient.invalidateQueries({ queryKey: ["project", project.id] })
            navigate(-1)
        },
    })
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, number>({
        mutationFn: (id) => deleteProject(id),
        onSuccess: (_, id) => {
            console.log('Delete Project')
            queryClient.setQueryData(["projects"], (oldProjects: IProject[] | undefined) => {
                if (!oldProjects) return []
                return oldProjects.filter((project) => project.id !== id)
            })
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        },
        onError: (error: any) => {
            console.log(`Project delete failed: ${error.response?.data?.message || error.message}`)
        }
    })
}

// Task
export const useTask = (taskId: number) => {
    return useQuery<ITask, Error>({ queryKey: ['task', taskId], queryFn: () => getTask(taskId) })
}

export const useCreateTask = () => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, Partial<ITask>>({
        mutationFn: (newTask) => createTask(newTask),
        onSuccess: (_, createdTask) => {
            queryClient.setQueryData(["tasks", createdTask.project], (oldTasks: ITask[] | undefined) => {
                return oldTasks ? [...oldTasks, createdTask] : [createdTask]
            })
            queryClient.invalidateQueries({ queryKey: ["project", createdTask.project] })
        },
        onError: (error: any) => {
            console.log(`Login failed: ${error.response?.data?.message || error.message}`)
        }
    })
}

export const useUpdateTask = (nav: boolean = false) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (task: Partial<ITask>) => updateTask(task),
        onSuccess: (_, task) => {
            queryClient.setQueryData(["tasks"], (oldTasks: ITask[] | undefined) => {
                return oldTasks?.map((t) => (t.id === task.id ? { ...t, ...task } : t)) || []
            })
            queryClient.invalidateQueries({ queryKey: ["project", task.project] })
            queryClient.invalidateQueries({ queryKey: ["task", task.id] })
            if (nav)
                navigate(-1)
        },
    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, ITask>({
        mutationFn: (task) => deleteTask(task.id),
        onSuccess: (__, deletedTask) => {
            queryClient.setQueryData<ITask[]>(["tasks"], (oldTasks = []) =>
                oldTasks.filter((task) => task.id !== deletedTask.id)
            )

            queryClient.invalidateQueries({ queryKey: ["project", deletedTask.project] })
        },
        onError: (error: any) => {
            console.log(`Task delete failed: ${error.response?.data?.message || error.message}`)
        },
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

// Users
export const useUsers = () => {
    return useQuery<IUser[], Error>({ queryKey: ['users'], queryFn: getUsers })
}

export const useUser = (userId: number) => {
    return useQuery<IUser, Error>({ queryKey: ['user', userId], queryFn: () => getUser(userId) })
}

export const useUserProjects = (userId: number) => {
    return useQuery<IProject[], Error>({ queryKey: ['users', userId], queryFn: () => getUserProjects(userId) })
}

// Documents 
export const useDocuments = () => {
    return useQuery<IDocument[], Error>({ queryKey: ['documents'], queryFn: getDocuments })
}

export const useDocument = (id: number) => {
    return useQuery<IDocument, Error>({ queryKey: ['document', id], queryFn: () => getDocument(id) })
}

// Messages 
export const useMessages = () => {
    return useQuery<IMessage[], Error>({ queryKey: ['messages'], queryFn: getMessages })
}

export const useCreateMessage = () => {
    const queryClient = useQueryClient()
    return useMutation<void, Error, Partial<IMessage>>({
        mutationFn: (newMessage) => createMessage(newMessage),
        onSuccess: (_, createdMessage) => {
            console.log('Create Message')
            queryClient.setQueryData(["messages", createdMessage.id], (oldMessages: IMessage[] | undefined) => {
                return oldMessages ? [...oldMessages, createdMessage] : [createdMessage]
            })

            queryClient.invalidateQueries({ queryKey: ["messages", createdMessage.id] })
        },
        onError: (error: any) => {
            console.log(`Login failed: ${error.response?.data?.message || error.message}`)
        }
    })
}

// Form
export const useForm = <T extends Record<string, any>>(initialState: Partial<T>) => {
    const [form, setForm] = useState<Partial<T>>(initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (onSubmit: (form: Partial<T>) => void) => (e: React.FormEvent) => {
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

