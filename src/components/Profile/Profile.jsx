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

import {
  useGetProfileQuery,
  useGetCurrentUserQuery,
} from '../../redux/usersApi'

import userPic from './../../assets/userpic.png'
import useStyles from './profileStyles'
import { useProfileHandlers } from './profileHandlers'
import css from './profile.module.scss'

const Profile = () => {
  const classes = useStyles()
  const { data: profile, error, isLoading } = useGetProfileQuery()
  const { data: currentUser } = useGetCurrentUserQuery()

  const {
    open,
    confirmDelete,
    isUpdating,
    isDeleting,
    formik,
    handleOpen,
    handleClose,
    handleConfirmDeleteOpen,
    handleConfirmDeleteClose,
    handleDelete,
  } = useProfileHandlers(profile)

  if (isLoading) return <CircularProgress />
  if (error) return <Typography color="error">Error loading profile</Typography>
  if (!profile) return null

  return (
    <div className={css.profileWrapper}>
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

      <div className={css.profileButtons}>
        <Button onClick={handleOpen} variant="contained" color="info">
          Edit profile
        </Button>
        <Button
          onClick={handleConfirmDeleteOpen}
          variant="contained"
          color="warning"
          disabled={currentUser?._id === '668bb855d7035d795911dfcc'}
        >
          {currentUser?._id !== '668bb855d7035d795911dfcc'
            ? 'Delete profile'
            : 'Undeletable profile(super admin)'}
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
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
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={isUpdating}>
                {isUpdating ? <CircularProgress size={24} /> : 'Save'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirmDelete}
        onClose={handleConfirmDeleteClose}
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
          <Button onClick={handleConfirmDeleteClose} color="secondary">
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
