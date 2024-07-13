import { useNavigate } from 'react-router-dom'
import { useAddSigninMutation } from '../../redux/authApi'
import SignInForm from './SignInForm'

const SignIn = () => {
  const navigate = useNavigate()
  const [addSignin] = useAddSigninMutation()

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await addSignin(values)
      if (data && data.token) {
        await localStorage.setItem('token', data.token)
        navigate('/companies')
      } else {
        console.error('Sign in error: Token not found in response')
      }
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return <SignInForm handleSubmit={handleSubmit} navigate={navigate} />
}

export default SignIn
