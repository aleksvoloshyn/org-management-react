import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  CircularProgress,
  TextField,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
  useGetCurrentUserQuery,
} from '../../redux/usersApi'

import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import userPic from './../../assets/userpic.png'
import css from './profile.module.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: '50px',
    width: '60%',
    height: '100%',
    margin: '20px auto',
    padding: theme.spacing(3),
    textAlign: 'center',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.shape.borderRadius,
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  info: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0,
    },
  },
  button: {
    marginTop: theme.spacing(2),
  },
  dialogContent: {
    padding: theme.spacing(3),
  },
  dialogForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}))

const Profile = () => {
  const classes = useStyles()
  const { data: profile, error, isLoading } = useGetProfileQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

  const {
    data: currentUser,
    error: currentUserError,
    isLoading: isCurrentUserLoading,
  } = useGetCurrentUserQuery()

  console.log(currentUser)

  const [open, setOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      nick_name: profile?.nick_name || '',
      description: profile?.description || '',
      position: profile?.position || '',
      email: profile?.email || '',
      phone_number: profile?.phone_number || '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phone_number: Yup.string().required('Phone number is required'),
    }),
    onSubmit: async (values) => {
      try {
        if (profile?._id) {
          await updateProfile({ _id: profile._id, ...values }).unwrap()
          setOpen(false) // Close the dialog on success
        } else {
          console.error('User ID (_id) is missing')
        }
      } catch (error) {
        console.error('Failed to update profile', error)
      }
    },
    enableReinitialize: true,
  })

  const handleDelete = async () => {
    try {
      if (profile?._id) {
        await deleteUser({ id: profile._id }).unwrap()
        localStorage.removeItem('token')
        navigate('../auth')
      } else {
        console.error('User ID (_id) is missing')
      }
    } catch (error) {
      console.error('Failed to delete profile', error)
    }
  }

  if (isLoading) return <CircularProgress />
  if (error) return <div>Error: {error.message}</div>
  if (!profile) return null

  return (
    <div className={css.profileWrapper}>
      {/* CARD */}
      <Card className={classes.root}>
        <img src={userPic} alt="userPic" width={60} height={80} />
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            {profile.first_name} {profile.last_name}
            <Divider />
          </Typography>
          <Typography variant="body1" className={classes.info}>
            <b>Nickname:</b> {profile.nick_name}
          </Typography>
          <Typography variant="body1" className={classes.info}>
            <b>Description:</b> {profile.description}
          </Typography>
          <Typography variant="body1" className={classes.info}>
            <b>Position:</b> {profile.position}
          </Typography>
          <Typography variant="body1" className={classes.info}>
            <b>Email:</b> {profile.email}
          </Typography>
          <Typography variant="body1" className={classes.info}>
            <b>Phone:</b> {profile.phone_number}
          </Typography>
        </CardContent>
      </Card>

      {/* BUTTONS */}
      <div className={css.profileButtons}>
        <Button onClick={() => setOpen(true)} variant="contained" color="info">
          Edit profile
        </Button>

        <Button
          onClick={() => setConfirmDelete(true)}
          variant="contained"
          color="warning"
          disabled={currentUser.nick_name === 'supervisor'}
        >
          {currentUser.nick_name !== 'supervisor'
            ? 'Delete profile'
            : 'Undeletable profile(super admin)'}
        </Button>
      </div>

      {/* EDIT FORM */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            className={classes.dialogForm}
          >
            <Grid container spacing={2} className={css.profileLabel}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.first_name &&
                    Boolean(formik.errors.first_name)
                  }
                  helperText={
                    formik.touched.first_name && formik.errors.first_name
                  }
                  fullWidth
                  required
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
                  helperText={
                    formik.touched.last_name && formik.errors.last_name
                  }
                  fullWidth
                  required
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
                  helperText={
                    formik.touched.nick_name && formik.errors.nick_name
                  }
                  fullWidth
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
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
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
                  fullWidth
                  multiline
                  rows={3}
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
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
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
                  fullWidth
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={isUpdating}>
                {isUpdating ? <CircularProgress size={24} /> : 'Save'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* CONFIRM DELETE DIALOG */}
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        aria-labelledby="confirm-delete-dialog"
      >
        <DialogTitle id="confirm-delete-dialog">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your profile? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="warning" disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Profile
