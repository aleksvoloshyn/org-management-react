import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Button } from '@mui/material'
import { useLogoutMutation } from '../../../redux/authLogoutApi'
import { companiesApi } from '../../../redux/companiesApi'
import { authApi } from '../../../redux/authApi'
import { usersApi } from '../../../redux/usersApi'
import css from './tools.module.scss'

const Tools = () => {
  const location = useLocation()
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
      dispatch(usersApi.util.resetApiState())
      navigate('../auth')
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }

  useEffect(() => {
    setCurrentPage(
      location.pathname.includes('/')
        ? location.pathname.split('/').pop()
        : location.pathname
    )
  }, [location.pathname])
  return (
    <div className={css.tools}>
      <h2 className={css.toolsCurrentPage}>{currentPage}</h2>
      <Button
        onClick={handleLogout}
        disabled={isLoading}
        variant="contained"
        color="error"
        className={css.toolsLogoutButton}
      >
        {' '}
        {isLoading ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  )
}
export default Tools
