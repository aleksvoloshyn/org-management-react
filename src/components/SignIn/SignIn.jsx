import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, TextField, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import css from './signIn.module.scss'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
})

const SignIn = () => {
  const navigate = useNavigate()
  return (
    // <Box sx={{ maxWidth: 380, mx: 'auto', mt: 3 }}>
    <Box className={css.signIn}>
      <h3 className={css.signinTitle}>Sign In</h3>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values)
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.signinInputForm}>
            <span className={css.signinInputSpan}>
              {' '}
              <Field
                name="email"
                as={TextField}
                fullWidth
                label="Email"
                helperText={<ErrorMessage name="email" />}
                error={Boolean(<ErrorMessage name="email" />)}
                className={css.signinInput}
              />
              <Field
                name="password"
                as={TextField}
                label="Password"
                type="password"
                margin="normal"
                fullWidth
                helperText={<ErrorMessage name="password" />}
                error={Boolean(<ErrorMessage name="password" />)}
                className={css.signinInput}
              />
            </span>

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              fullWidth
              className={css.signInButton}
            >
              Sign In
            </Button>

            <p className={css.signInRedirect}>
              Create A New Account?{' '}
              <span
                className={css.signInRedirectLink}
                onClick={() => {
                  navigate('./signup')
                }}
              >
                Sign Up
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default SignIn
