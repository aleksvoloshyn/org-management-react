import css from './sidebar.module.scss'

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
      <h2>Sidebar</h2>
      <ul>
        <li>
          <a href="#companies">Companies</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
