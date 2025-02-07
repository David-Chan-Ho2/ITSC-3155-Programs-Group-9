import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import Layout from './layouts/Layout'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import NoMatchPage from './pages/NoMatchPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' Component={Layout}>
          <Route path='' Component={DashboardPage} />
          <Route path='/projects/:id' Component={ProjectDetailPage} />

          <Route path='' Component={AuthLayout}>
            <Route path='/register' Component={RegisterPage} />
            <Route path='/login' Component={LoginPage} />
          </Route>

          <Route path='*' Component={NoMatchPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
