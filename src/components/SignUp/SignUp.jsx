import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, TextField, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAddSignupMutation } from '../../redux/authApi'
import css from './signup.module.scss'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  phone_number: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  first_name: Yup.string().required('Required'),
  nick_name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  position: Yup.string().required('Required'),
})

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
  return (
    <Box className={css.signUp}>
      <h3 className={css.signUpTitle}>Sign Up</h3>
      <Formik
        initialValues={{
          email: '',
          password: '',
          phone_number: '',
          last_name: '',
          first_name: '',
          nick_name: '',
          description: '',
          position: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              name="email"
              as={TextField}
              label="Email"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="email" />}
              error={Boolean(<ErrorMessage name="email" />)}
              className={css.signUpInput}
            />
            <Field
              name="password"
              as={TextField}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="password" />}
              error={Boolean(<ErrorMessage name="password" />)}
              className={css.signUpInput}
            />
            <Field
              name="phone_number"
              as={TextField}
              label="Phone Number"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="phone_number" />}
              error={Boolean(<ErrorMessage name="phone_number" />)}
              className={css.signUpInput}
            />
            <Field
              name="last_name"
              as={TextField}
              label="Last Name"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="last_name" />}
              error={Boolean(<ErrorMessage name="last_name" />)}
              className={css.signUpInput}
            />
            <Field
              name="first_name"
              as={TextField}
              label="First Name"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="first_name" />}
              error={Boolean(<ErrorMessage name="first_name" />)}
              className={css.signUpInput}
            />
            <Field
              name="nick_name"
              as={TextField}
              label="Nick Name"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="nick_name" />}
              error={Boolean(<ErrorMessage name="nick_name" />)}
              className={css.signUpInput}
            />
            <Field
              name="description"
              as={TextField}
              label="Description"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="description" />}
              error={Boolean(<ErrorMessage name="description" />)}
              className={css.signUpInput}
            />
            <Field
              name="position"
              as={TextField}
              label="Position"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="position" />}
              error={Boolean(<ErrorMessage name="position" />)}
              className={css.signUpInput}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              fullWidth
              className={css.signUpButton}
              sx={{ mt: '80px' }}
            >
              Sign Up
            </Button>{' '}
            <p className={css.signUpRedirect}>
              Already Have An Account?
              <span
                className={css.signUpRedirectLink}
                onClick={() => {
                  navigate('../')
                }}
              >
                Log In
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default SignUp
