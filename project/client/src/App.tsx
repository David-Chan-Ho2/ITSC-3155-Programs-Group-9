import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { useAppDispatch } from './app/hooks'
import { login } from './app/slices/authSlice'
import ProtectedRoute from './components/route/ProtectedRoute'
import Layout from './layouts/Layout'
import LoginPage from './pages/auth/LoginPage'
import LogoutPage from './pages/auth/LogoutPage'
import RegisterPage from './pages/auth/RegisterPage'
import ChatPage from './pages/chat/ChatPage'
import DocumentDetailPage from './pages/documents/DocumentDetailPage'
import DocumentPage from './pages/documents/DocumentPage'
import NoMatchPage from './pages/NoMatchPage'
import CreateProjectPage from './pages/projects/CreateProjectPage'
import EditProjectPage from './pages/projects/EdittProjectPage'
import ProjectDetailPage from './pages/projects/ProjectDetailPage'
import ProjectPage from './pages/projects/ProjectPage'
import TaskDetailPage from './pages/tasks/TaskDetailPage'
import TeamPage from './pages/teams/TeamPage'
import SettingPage from './pages/users/SettingPage'
import UserDetailPage from './pages/users/UserDetailPage'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(login({
      access: "1111",
      id: 1
    }))
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Layout} element={<ProtectedRoute />}>

          <Route path='/' Component={ProjectPage} />

          <Route path='/projects/create' Component={CreateProjectPage} />
          <Route path="/projects/:id" Component={ProjectDetailPage} />
          <Route path="/projects/:id/edit" Component={EditProjectPage} />

          <Route path='/tasks/:id' Component={TaskDetailPage} />

          <Route path='/teams' Component={TeamPage} />

          <Route path='/chat' Component={ChatPage} />

          <Route path='/documents' Component={DocumentPage} />
          <Route path='/documents/:id' Component={DocumentDetailPage} />

          <Route path='/users/:id' Component={UserDetailPage} />

          <Route path='/settings' Component={SettingPage} />

          <Route path='*' Component={NoMatchPage} />
        </Route>

        <Route path='/register' Component={RegisterPage} />
        <Route path='/login' Component={LoginPage} />
        <Route path='/logout' Component={LogoutPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
