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
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useStyles } from './styles'
import { validationSchema } from './validationSchema'
import { handleDelete, handleSubmit } from './handlers'
import {
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
  useGetCurrentUserQuery,
  useSetAdminRightsMutation,
} from '../../redux/usersApi'
import userPic from './../../assets/userpic.png'
import css from './usersProfile.module.scss'

const UsersProfile = () => {
  const classes = useStyles()
  const { id } = useParams()
  const { data: profile, error, isLoading } = useGetUserByIdQuery(id)
  const { data: currentUser } = useGetCurrentUserQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  const [setAdminRights, { isLoading: isSettingAdmin }] =
    useSetAdminRightsMutation()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmAdmin, setConfirmAdmin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(profile?.isAdmin || false)

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
    validationSchema,
    onSubmit: (values) => handleSubmit(values, profile, updateProfile, setOpen),
    enableReinitialize: true,
  })

  const handleAdminChange = async () => {
    setConfirmAdmin(true)
  }

  const handleConfirmAdminChange = async () => {
    setConfirmAdmin(false)
    try {
      await setAdminRights({ id: profile._id, isAdmin: !isAdmin })
      setIsAdmin(!isAdmin)
    } catch (error) {
      console.error('Ошибка при обновлении админ прав:', error)
    }
  }

  if (isLoading) return <CircularProgress />
  if (error) {
    return <div>Error: {error.message}</div>
  }
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
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/users/userslist')}
        >
          <KeyboardBackspaceIcon />
          Back
        </Button>
        <Button onClick={() => setOpen(true)} variant="contained" color="info">
          Edit profile
        </Button>

        {currentUser && currentUser._id === '668bb855d7035d795911dfcc' && (
          <FormControlLabel
            className={classes.red}
            control={
              <Checkbox
                checked={profile.isAdmin}
                onChange={handleAdminChange}
                color="error"
                className={classes.red}
                disabled={profile._id === '668bb855d7035d795911dfcc'}
              />
            }
            label="Admin rights"
          />
        )}

        <Button
          onClick={() => setConfirmDelete(true)}
          variant="contained"
          color="warning"
          disabled={profile.isAdmin === true}
        >
          {profile._id !== '668bb855d7035d795911dfcc'
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
            Are you sure you want to delete this profile? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(profile, deleteUser, navigate)}
            color="warning"
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* CONFIRM ADMIN RIGHTS DIALOG */}
      <Dialog
        open={confirmAdmin}
        onClose={() => setConfirmAdmin(false)}
        aria-labelledby="confirm-admin-dialog"
      >
        <DialogTitle id="confirm-admin-dialog">
          Confirm Admin Rights
        </DialogTitle>
        <DialogContent>
          <Typography>
            {`Are you sure you want to ${
              isAdmin ? 'remove' : 'grant'
            } admin rights?`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmAdmin(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAdminChange}
            color="primary"
            disabled={isSettingAdmin}
          >
            {isSettingAdmin ? <CircularProgress size={24} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UsersProfile
