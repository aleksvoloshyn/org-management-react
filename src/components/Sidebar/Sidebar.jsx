import Divider from '@mui/material/Divider'
import Person4Icon from '@mui/icons-material/Person4'
import { NavLink } from 'react-router-dom'

import { useGetCurrentUserQuery } from './../../redux/userSlice'
import { useEffect } from 'react'
import css from './sidebar.module.scss'

const Sidebar = () => {
  const { data, refetch } = useGetCurrentUserQuery()

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className={css.sidebar}>
      <div className={css.sidebarCurrentUser}>
        <Person4Icon />
        <h3 className={css.sidebarTitle}>
          <span className={css.sidebarSpanUser}>user:</span>{' '}
          {data?.nick_name || '???'}
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
        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? css.activeLink : css.link)}
        >
          Users
        </NavLink>
      </nav>
      <Divider />
      <NavLink
        to="/users"
        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
      >
        Profile
      </NavLink>
    </div>
  )
}

export default Sidebar
