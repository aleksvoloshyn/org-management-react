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
import { green, red } from '@mui/material/colors'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  useGetUsersListQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
} from '../../redux/usersApi'

import css from './usersList.module.scss'

const UsersList = () => {
  const { data, error, isLoading } = useGetUsersListQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const [deleteUser] = useDeleteUserMutation()
  const [open, setOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  console.log(data)

  const currentUserToken = localStorage.getItem('token')
  console.log(currentUserToken)

  const handleEditClick = (user) => {
    setSelectedUser(user)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedUser(null)
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

  if (isLoading) return <CircularProgress />
  if (error) return <Typography color="error">Error loading users</Typography>

  const columns = [
    { id: 'fullName', label: 'Full Name', minWidth: 150 },
    { id: 'nickName', label: 'Nickname', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 160 },
    { id: 'position', label: 'Position', minWidth: 120 },
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'phoneNumber', label: 'Phone Number', minWidth: 160 },
    { id: 'rights', label: 'Rights', minWidth: 80 },
    { id: 'actions', label: 'Actions', minWidth: 100 },
  ]

  return (
    <Box sx={{ width: '100%', overflowY: 'auto' }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ display: 'block', mb: 3 }}
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
                    onClick={() => handleEditClick(user)}
                    sx={{ color: green[600] }}
                    disabled={user.token !== currentUserToken && user.isAdmin}
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
                      formik.touched.last_name &&
                      Boolean(formik.errors.last_name)
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
                      formik.touched.nick_name &&
                      Boolean(formik.errors.nick_name)
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
                    helperText={
                      formik.touched.position && formik.errors.position
                    }
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
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
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
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-user-dialog-title"
        aria-describedby="delete-user-dialog-description"
      >
        <DialogTitle id="delete-user-dialog-title">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-user-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UsersList
