import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import Layout from './layouts/Layout'
import LoginPage from './pages/LoginPage'
import NoMatchPage from './pages/NoMatchPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' Component={Layout}>
          <Route path='*' Component={NoMatchPage} />

          <Route path='' Component={AuthLayout}>
            <Route path='/register' Component={RegisterPage} />
            <Route path='/login' Component={LoginPage} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
