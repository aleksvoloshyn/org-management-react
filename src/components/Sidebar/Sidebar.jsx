import { NavLink } from 'react-router-dom'
import css from './sidebar.module.scss'

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
      <nav className={css.nav}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/signin">Signin</NavLink>
        <NavLink to="/companies">Сompanies</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
    </div>
  )
}

export default Sidebar
