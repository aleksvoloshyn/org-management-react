import css from './searchbar.module.scss'

import sprite from './../../../assets/sprite.svg'

const Searchbar = () => {
  return (
    <div className={css.searchBar}>
      <label htmlFor={1} className={css.searchLabel}>
        <svg className={css.searchLogo}>
          <use xlinkHref={`${sprite}#Search `} />
        </svg>
        <input
          className={css.searchInput}
          type="text"
          placeholder="Search "
          // value={}
          // onChange={}
          name="login"
          id={1}
        />
      </label>
    </div>
  )
}

export default Searchbar
