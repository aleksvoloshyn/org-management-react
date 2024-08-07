import Divider from '@mui/material/Divider'
import Person4Icon from '@mui/icons-material/Person4'
import { NavLink } from 'react-router-dom'
import { useGetCurrentUserQuery } from '../../redux/usersApi'
import { useEffect } from 'react'
import css from './sidebar.module.scss'

const Sidebar = () => {
  const { data: currentUser, refetch } = useGetCurrentUserQuery()

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className={css.sidebar}>
      <div className={css.sidebarCurrentUser}>
        <Person4Icon />
        <h3 className={css.sidebarTitle}>
          <span className={currentUser?.isAdmin ? css.adminSpan : css.userSpan}>
            {currentUser?.isAdmin ? 'admin' : 'user'}:
          </span>{' '}
          {currentUser?.nick_name || '???'}
        </h3>
      </div>

      <Divider />
      <nav className={css.nav}>
        <NavLink
          to="/companies"
          className={({ isActive }) => (isActive ? css.activeLink : css.link)}
        >
          Сompanies
        </NavLink>
        {currentUser?.isAdmin && (
          <NavLink
            to="/users/userslist"
            className={({ isActive }) => (isActive ? css.activeLink : css.link)}
          >
            Users
          </NavLink>
        )}
      </nav>
      <Divider />
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
      >
        Profile
      </NavLink>
    </div>
  )
}

export default Sidebar
