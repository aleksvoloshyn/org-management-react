import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Box,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import css from './usersList.module.scss'

const validationSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone_number: Yup.string().required('Phone number is required'),
})

const EditUserForm = ({ open, handleClose, user, updateProfile }) => {
  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      nick_name: user?.nick_name || '',
      description: user?.description || '',
      position: user?.position || '',
      email: user?.email || '',
      phone_number: user?.phone_number || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (user?._id) {
          await updateProfile({ _id: user._id, ...values }).unwrap()
          handleClose()
        } else {
          console.error('User ID (_id) is missing')
        }
      } catch (error) {
        console.error('Failed to update profile', error)
      }
    },
    enableReinitialize: true,
  })

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Update User Profile</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Grid container spacing={2} className={css.usersListLabel}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.first_name && Boolean(formik.errors.first_name)
                }
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.last_name && Boolean(formik.errors.last_name)
                }
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nickname"
                name="nick_name"
                value={formik.values.nick_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.nick_name && Boolean(formik.errors.nick_name)
                }
                helperText={formik.touched.nick_name && formik.errors.nick_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Position"
                name="position"
                value={formik.values.position}
                onChange={formik.handleChange}
                error={
                  formik.touched.position && Boolean(formik.errors.position)
                }
                helperText={formik.touched.position && formik.errors.position}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phone_number"
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                error={
                  formik.touched.phone_number &&
                  Boolean(formik.errors.phone_number)
                }
                helperText={
                  formik.touched.phone_number && formik.errors.phone_number
                }
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose} color="secondary" variant="contained">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Update
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default EditUserForm
