// src/components/SignUp.jsx

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, TextField, Box, Typography } from '@mui/material'

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
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" mb={2}>
        Sign Up
      </Typography>
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
            <Field
              name="phone_number"
              as={TextField}
              label="Phone Number"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="phone_number" />}
              error={Boolean(<ErrorMessage name="phone_number" />)}
            />
            <Field
              name="last_name"
              as={TextField}
              label="Last Name"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="last_name" />}
              error={Boolean(<ErrorMessage name="last_name" />)}
            />
            <Field
              name="first_name"
              as={TextField}
              label="First Name"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="first_name" />}
              error={Boolean(<ErrorMessage name="first_name" />)}
            />
            <Field
              name="nick_name"
              as={TextField}
              label="Nick Name"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="nick_name" />}
              error={Boolean(<ErrorMessage name="nick_name" />)}
            />
            <Field
              name="description"
              as={TextField}
              label="Description"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="description" />}
              error={Boolean(<ErrorMessage name="description" />)}
            />
            <Field
              name="position"
              as={TextField}
              label="Position"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="position" />}
              error={Boolean(<ErrorMessage name="position" />)}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default SignUp
