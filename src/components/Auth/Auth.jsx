// import Container from './../Container'
import SignUp from './../SignUp'
import SignIn from './../SignIn'
import css from './auth.module.scss'
import { Route, Routes } from 'react-router-dom'

const Auth = () => {
  return (
    <div className={css.auth}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}
export default Auth
