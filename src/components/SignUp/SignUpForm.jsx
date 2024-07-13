import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button, TextField, Box } from '@mui/material'
import validationSchema from './validationSchema'
import css from './signup.module.scss'

const SignUpForm = ({ handleSubmit, navigate }) => {
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
              {isSubmitting ? 'Submitting...' : 'Sign Up'}
            </Button>
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

export default SignUpForm
