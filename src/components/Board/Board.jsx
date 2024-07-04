import { Route, Routes } from 'react-router-dom'
import CompaniesPage from './../../pages/CompaniesPage/'
import Toolbar from '../Toolbar/Toolbar'
import css from './board.module.scss'
import UsersListPage from '../../pages/UsersListPage'
import NotFoundPage from './../../pages/NotFoundPage'
import ProfilePage from '../../pages/ProfilePage'

const Board = () => {
  return (
    <div className={css.board}>
      <Toolbar />
      <Routes>
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/users/userslist" element={<UsersListPage />} />
        {/* <Route path="/*" element={<NotFoundPage />} /> */}
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      {/* <p>bottom</p> */}
    </div>
  )
}

export default Board
