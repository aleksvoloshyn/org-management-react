// import Searchbar from './Searchbar'
import Tools from './Tools/Tools'
import css from './toolbar.module.scss'

const Toolbar = () => {
  return (
    <div className={css.toolbar}>
      <Tools />
      {/* <Searchbar /> */}
    </div>
  )
}

export default Toolbar
