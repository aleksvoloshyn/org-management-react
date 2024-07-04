import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from './../../../redux/authSlice'
import { companiesApi } from '../../../redux/companiesSlice'
import { authApi } from '../../../redux/authSlice'
import { currentApiSlice } from './../../../redux/userSlice'
import css from './tools.module.scss'

const Tools = () => {
  const location = useLocation() // Получаем текущий путь
  const [currentPage, setCurrentPage] = useState(location.pathname.slice(1))

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logout, { isLoading, isError }] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logout()

      localStorage.removeItem('token')
      dispatch(companiesApi.util.resetApiState())
      dispatch(authApi.util.resetApiState())
      dispatch(currentApiSlice.util.resetApiState())
      navigate('../auth') // Перенаправление на страницу входа после выхода
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }

  useEffect(() => {
    setCurrentPage(location.pathname.slice(1))
  }, [location.pathname])
  return (
    <div className={css.tools}>
      <h2 className={css.toolsCurrentPage}>{currentPage}</h2>
      <button onClick={handleLogout} disabled={isLoading}>
        {' '}
        {isLoading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  )
}
export default Tools
