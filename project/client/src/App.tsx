import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/route/ProtectedRoute'
import Layout from './layouts/Layout'
import CalendarPage from './pages/CalendarPage'
import CreateProjectPage from './pages/CreateProjectPage'
import DocumentPage from './pages/DocumentPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NoMatchPage from './pages/NoMatchPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ProjectPage from './pages/ProjectPage'
import RegisterPage from './pages/RegisterPage'
import SettingPage from './pages/SettingPage'
import TaskDetailPage from './pages/TaskDetailPage'
import TeamPage from './pages/TeamPage'
import UpdateProjectPage from './pages/UpdatetProjectPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route Component={Layout}>
            <Route path='/' Component={HomePage} />

            <Route path='/projects' Component={ProjectPage} />
            <Route path='/projects/create' Component={CreateProjectPage} />
            <Route path='/projects/teams' Component={ProjectPage} />
            <Route path='/projects/documents' Component={ProjectPage} />
            <Route path='/projects/:id' Component={ProjectDetailPage} />
            <Route path='/projects/:id/update' Component={UpdateProjectPage} />
    
            <Route path='/tasks/:id' Component={TaskDetailPage} />

            <Route path='/teams' Component={TeamPage} />
            <Route path='/teams/:id' Component={TeamPage} />

            <Route path='/documents' Component={DocumentPage} />
            <Route path='/documents/:id' Component={DocumentPage} />

            <Route path='/calendar' Component={CalendarPage} />

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
