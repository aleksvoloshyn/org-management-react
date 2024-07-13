import { useState } from 'react'
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
} from '@mui/material'
import { green, red, blue } from '@mui/material/colors'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'

import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
  useGetUsersListQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
} from '../../redux/usersApi'
import { useAddSignupMutation } from '../../redux/authApi'
import { useNavigate } from 'react-router-dom'
import css from './usersList.module.scss'

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

const UsersList = () => {
  const { data, error, isLoading, refetch } = useGetUsersListQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const [deleteUser] = useDeleteUserMutation()
  const [addSignup] = useAddSignupMutation()
  const [open, setOpen] = useState(false)
  const [openAddUser, setOpenAddUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  const currentUserToken = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleEditClick = (user) => {
    setSelectedUser(user)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedUser(null)
  }

  const handleOpenAddUser = () => {
    setOpenAddUser(true)
  }

  const handleCloseAddUser = () => {
    setOpenAddUser(false)
  }

  const handleDeleteDialogOpen = (id) => {
    setUserToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteDialogClose = () => {
    setUserToDelete(null)
    setDeleteDialogOpen(false)
  }

  const handleDeleteClick = async () => {
    try {
      if (userToDelete) {
        await deleteUser({ id: userToDelete }).unwrap()
        handleDeleteDialogClose()
      } else {
        console.error('User ID (_id) is missing')
      }
    } catch (err) {
      console.error('Failed to delete user:', err)
    }
  }

  const formik = useFormik({
    initialValues: {
      first_name: selectedUser?.first_name || '',
      last_name: selectedUser?.last_name || '',
      nick_name: selectedUser?.nick_name || '',
      description: selectedUser?.description || '',
      position: selectedUser?.position || '',
      email: selectedUser?.email || '',
      phone_number: selectedUser?.phone_number || '',
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
        if (selectedUser?._id) {
          await updateProfile({ _id: selectedUser._id, ...values }).unwrap()
          setOpen(false)
        } else {
          console.error('User ID (_id) is missing')
        }
      } catch (error) {
        console.error('Failed to update profile', error)
      }
    },
    enableReinitialize: true,
  })

  const handleSubmitAddUser = async (values, { setSubmitting }) => {
    try {
      await addSignup(values).unwrap()
      console.log('Registration successful!')
      setSubmitting(false)
      setOpenAddUser(false)
      refetch()
    } catch (error) {
      console.error('Failed to register:', error)
      setSubmitting(false)
    }
  }

  if (isLoading) return <CircularProgress />
  if (error) return <Typography color="error">Error loading users</Typography>

  const columns = [
    { id: 'fullName', label: 'Full Name', minWidth: 130 },
    { id: 'nickName', label: 'Nickname', minWidth: 110 },
    { id: 'description', label: 'Description', minWidth: 150 },
    { id: 'position', label: 'Position', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'phoneNumber', label: 'Phone Number', minWidth: 160 },
    { id: 'rights', label: 'Rights', minWidth: 80 },
    { id: 'actions', label: 'Actions', minWidth: 150 },
  ]

  return (
    <Box sx={{ width: '100%', overflowY: 'auto' }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ display: 'block', mb: 3 }}
        onClick={handleOpenAddUser}
      >
        + Add New user
      </Button>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{ fontWeight: 'bold', minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user._id}>
                <TableCell sx={{ padding: '8px' }}>
                  {`${user.first_name} ${user.last_name}`}
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>{user.nick_name}</TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  {user.description}
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>{user.position}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{user.email}</TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  {user.phone_number}
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography
                    style={{ color: user.isAdmin ? red[500] : green[500] }}
                  >
                    {user.isAdmin ? 'Admin' : 'User'}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <IconButton
                    onClick={() => navigate(`/users/${user._id}`)}
                    // onClick={() => console.log(`/users/${user._id}`)}
                    sx={{ color: green[600] }}
                  >
                    <RemoveRedEyeIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleEditClick(user)}
                    sx={{ color: blue[600] }}
                    // disabled={user.token !== currentUserToken && user.isAdmin}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteDialogOpen(user._id)}
                    sx={{ color: red[600] }}
                    disabled={user.isAdmin}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        // EDIT USER FORM
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
                      formik.touched.first_name &&
                      Boolean(formik.errors.first_name)
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
                      formik.touched.last_name &&
                      Boolean(formik.errors.last_name)
                    }
                    helperText={
                      formik.touched.last_name && formik.errors.last_name
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nickname"
                    name="nick_name"
                    value={formik.values.nick_name}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.nick_name &&
                      Boolean(formik.errors.nick_name)
                    }
                    helperText={
                      formik.touched.nick_name && formik.errors.nick_name
                    }
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
                    helperText={
                      formik.touched.position && formik.errors.position
                    }
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
                  disabled={isUpdating}
                >
                  Update
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      <Dialog
        open={openAddUser}
        onClose={handleCloseAddUser}
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
                  onClick={handleCloseAddUser}
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

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteDialogClose}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteClick}
            color="primary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UsersList
