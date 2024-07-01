import PropTypes from 'prop-types'
import css from './container.module.scss'

const Container = ({ children }) => {
  return <div className={css.container}>{children}</div>
}

Container.propTypes = {
  children: PropTypes.node,
}

export default Container
