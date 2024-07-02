import { NavLink } from 'react-router-dom'
import css from './sidebar.module.scss'

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
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
        <NavLink
          to="/auth"
          className={({ isActive }) => (isActive ? css.activeLink : css.link)}
        >
          Auth
        </NavLink>
      </nav>
    </div>
  )
}

export default Sidebar
