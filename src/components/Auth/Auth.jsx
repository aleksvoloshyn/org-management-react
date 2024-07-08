import SignUp from './../SignUp'
import SignIn from './../SignIn'
import css from './auth.module.scss'
import { Route, Routes } from 'react-router-dom'
import NotFoundPage from '../../pages/NotFoundPage'

const Auth = () => {
  return (
    <div className={css.auth}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
export default Auth
