import { Routes, Route } from 'react-router-dom'
import ProtectedRouteAuth from '../ProtectedRoutes/ProtectedRouteAuth'

import Auth from '../Auth'

import './App.css'
import HomePage from '../../pages/HomePage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route
          path="*"
          element={
            <ProtectedRouteAuth>
              <HomePage />
            </ProtectedRouteAuth>
          }
        />
      </Routes>
    </>
  )
}

export default App
