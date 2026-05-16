import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
        } />
    </Routes>
  )
}

export default App
