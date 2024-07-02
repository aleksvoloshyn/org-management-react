import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import css from './tools.module.scss'

const Tools = () => {
  const location = useLocation() // Получаем текущий путь
  const [currentPage, setCurrentPage] = useState(location.pathname.slice(1))

  useEffect(() => {
    setCurrentPage(location.pathname.slice(1))
  }, [location.pathname])
  return (
    <div className={css.tools}>
      <h2 className={css.toolsCurrentPage}>{currentPage}</h2>
    </div>
  )
}
export default Tools
