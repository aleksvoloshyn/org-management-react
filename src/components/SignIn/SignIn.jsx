import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, TextField, Box, Typography } from '@mui/material'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
})

const SignIn = () => {
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" mb={2}>
        Sign In
      </Typography>
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
          <Form>
            <Field
              name="email"
              as={TextField}
              label="Email"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="email" />}
              error={Boolean(<ErrorMessage name="email" />)}
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
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default SignIn
