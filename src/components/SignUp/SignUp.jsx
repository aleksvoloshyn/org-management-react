import { useNavigate } from 'react-router-dom'
import { useAddSignupMutation } from '../../redux/authApi'
import SignUpForm from './SignUpForm'

const SignUp = () => {
  const navigate = useNavigate()
  const [addSignup] = useAddSignupMutation()

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await addSignup(values).unwrap()
      console.log('Registration successful!')
      console.log(values)
      setSubmitting(false)
      navigate('../')
    } catch (error) {
      console.error('Failed to register:', error)
      setSubmitting(false)
    }
  }

  return <SignUpForm handleSubmit={handleSubmit} navigate={navigate} />
}

export default SignUp
