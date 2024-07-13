import { Route, Routes } from 'react-router-dom'
import CompaniesPage from './../../pages/CompaniesPage/'
import Toolbar from '../Toolbar/Toolbar'
import css from './board.module.scss'
import UsersListPage from '../../pages/UsersListPage'
import UsersProfilePage from '../../pages/UsersProfilePage'
import NotFoundPage from './../../pages/NotFoundPage'
import ProfilePage from '../../pages/ProfilePage'
import CompanyDetailsPage from '../../pages/CompanyDetailsPage'
import ProtectedRouteAdmin from '../ProtectedRoutes/ProtectedRouteAdmin'

const Board = () => {
  return (
    <div className={css.board}>
      <Toolbar />
      <Routes>
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/:id" element={<CompanyDetailsPage />} />

        <Route
          path="/users/userslist"
          element={<ProtectedRouteAdmin element={UsersListPage} adminOnly />}
        />
        <Route
          path="/users/:id"
          element={<ProtectedRouteAdmin element={UsersProfilePage} adminOnly />}
        />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default Board
