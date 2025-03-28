import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { useAppDispatch } from './app/hooks'
import { login } from './app/slices/authSlice'
import ProtectedRoute from './components/route/ProtectedRoute'
import Layout from './layouts/Layout'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import CalendarPage from './pages/calendar/CalendarPage'
import ChatPage from './pages/chat/ChatPage'
import DocumentDetailPage from './pages/documents/DocumentDetailPage'
import DocumentPage from './pages/documents/DocumentPage'
import ViewDocumentPage from './pages/documents/ViewDocumentPage'
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
        <Route element={<ProtectedRoute />}>
          <Route Component={Layout}>
            <Route path='/' Component={ProjectPage} />

            <Route path='projects/'>
              <Route path='create' Component={CreateProjectPage} />
              <Route path='teams' Component={ProjectPage} />
              <Route path='documents' Component={ProjectPage} />
              
              <Route path=':projectId/tasks/:id' Component={TaskDetailPage} />

              <Route path=":id/">
                <Route path="" Component={ProjectDetailPage} />
                <Route path='edit' Component={EditProjectPage} />


                <Route path='teams' Component={TeamPage} />

                <Route path='documents/'>
                  <Route Component={DocumentPage} />

                  <Route path=':id/'>
                    <Route path="" Component={DocumentDetailPage} />
                    <Route path='view' Component={ViewDocumentPage} />
                  </Route>

                </Route>


                <Route path='chat' Component={ChatPage} />

                <Route path='calendar' Component={CalendarPage} />
              </Route>

            </Route>

            <Route path='/users/:id' Component={UserDetailPage} />

            <Route path='/settings' Component={SettingPage} />

            <Route path='*' Component={NoMatchPage} />
          </Route>
        </Route>

        <Route path='/register' Component={RegisterPage} />
        <Route path='/login' Component={LoginPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
