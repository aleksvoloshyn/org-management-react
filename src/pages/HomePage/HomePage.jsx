import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Board from '../../components/Board/Board'
import Sidebar from '../../components/Sidebar/Sidebar'
import css from './homePage.module.scss'

const HomePage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const validPaths = ['/', '/companies', '/users/userslist', '/profile']

    const dynamicPaths = [/^\/companies\/[0-9a-fA-F]{24}$/]

    const isPathValid =
      validPaths.includes(location.pathname) ||
      dynamicPaths.some((regex) => regex.test(location.pathname))

    if (!isPathValid) {
      navigate('/not-found')
    }
  }, [location.pathname, navigate])

  return (
    <div className={css.homePage}>
      <Sidebar />
      <Board />
    </div>
  )
}

export default HomePage
