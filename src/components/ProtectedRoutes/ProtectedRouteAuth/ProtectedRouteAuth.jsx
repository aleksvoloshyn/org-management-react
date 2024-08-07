import { Navigate } from 'react-router-dom'

const ProtectedRouteAuth = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/auth" />
}

export default ProtectedRouteAuth
