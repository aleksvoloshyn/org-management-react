import { Route, Routes } from 'react-router-dom'
import CompaniesPage from './../../pages/CompaniesPage/'
import Toolbar from '../Toolbar/Toolbar'
import css from './board.module.scss'
import UsersPage from './../../pages/UsersPage'
import NotFoundPage from './../../pages/NotFoundPage'

const Board = () => {
  return (
    <div className={css.board}>
      <Toolbar />
      <Routes>
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default Board
