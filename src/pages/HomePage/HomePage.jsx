import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import Board from '../../components/Board/Board'
import Sidebar from '../../components/Sidebar/Sidebar'
import css from './homePage.module.scss'

const HomePage = () => {
  const navigate = useNavigate()

  // useEffect(() => {
  //   const validPaths = [
  //     '/',
  //     '/companies',
  //     '/users/userslist',
  //     '/profile',
  //     '/companies/:id ',
  //   ]
  //   if (!validPaths.includes(location.pathname)) {
  //     navigate('/not-found')
  //   }
  // }, [navigate])
  return (
    <div className={css.homePage}>
      <Sidebar />
      <Board />
    </div>
  )
}

export default HomePage
