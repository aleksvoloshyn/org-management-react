import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button, TextField, Box } from '@mui/material'
import validationSchema from './validationSchema'
import css from './signIn.module.scss'

const SignInForm = ({ handleSubmit, navigate }) => {
  return (
    <Box className={css.signIn}>
      <h3 className={css.signinTitle}>Sign In</h3>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.signinInputForm}>
            <span className={css.signinInputSpan}>
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
                onClick={() => navigate('./signup')}
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

export default SignInForm
