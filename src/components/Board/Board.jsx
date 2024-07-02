import { Routes, Route } from 'react-router-dom'
import css from './board.module.scss'
import Home from '../Home/Home'
import NotFound from '../NotFound'

import SigninPage from '../../pages/SigninPage'
import SignupPage from '../../pages/SignupPage'
import CompaniesPage from '../../pages/CompaniesPage'
import UsersPage from '../../pages//UsersPage'

const Board = () => {
  return (
    <div className={css.board}>
      {' '}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </div>
  )
}

export default Board
