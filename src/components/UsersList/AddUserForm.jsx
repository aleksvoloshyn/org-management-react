import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
} from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

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

const AddUserForm = ({ open, handleClose, addSignup, refetch }) => {
  const handleSubmitAddUser = async (values, { setSubmitting }) => {
    try {
      await addSignup(values).unwrap()
      setSubmitting(false)
      handleClose()
      refetch()
    } catch (error) {
      console.error('Failed to register:', error)
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          nick_name: '',
          description: '',
          position: '',
          email: '',
          password: '',
          phone_number: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitAddUser}
      >
        {({ isSubmitting }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="First Name"
                    name="first_name"
                    fullWidth
                    error={Boolean(<ErrorMessage name="first_name" />)}
                    helperText={<ErrorMessage name="first_name" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Last Name"
                    name="last_name"
                    fullWidth
                    error={Boolean(<ErrorMessage name="last_name" />)}
                    helperText={<ErrorMessage name="last_name" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Nickname"
                    name="nick_name"
                    fullWidth
                    error={Boolean(<ErrorMessage name="nick_name" />)}
                    helperText={<ErrorMessage name="nick_name" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Description"
                    name="description"
                    fullWidth
                    error={Boolean(<ErrorMessage name="description" />)}
                    helperText={<ErrorMessage name="description" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Position"
                    name="position"
                    fullWidth
                    error={Boolean(<ErrorMessage name="position" />)}
                    helperText={<ErrorMessage name="position" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    fullWidth
                    error={Boolean(<ErrorMessage name="email" />)}
                    helperText={<ErrorMessage name="email" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Phone Number"
                    name="phone_number"
                    fullWidth
                    error={Boolean(<ErrorMessage name="phone_number" />)}
                    helperText={<ErrorMessage name="phone_number" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    error={Boolean(<ErrorMessage name="password" />)}
                    helperText={<ErrorMessage name="password" />}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                color="secondary"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting}
              >
                Add User
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

export default AddUserForm
