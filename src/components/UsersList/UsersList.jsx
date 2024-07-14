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
} from '@mui/material'
import { green, red, blue } from '@mui/material/colors'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'

import {
  useGetUsersListQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
} from '../../redux/usersApi'
import { useAddSignupMutation } from '../../redux/authApi'
import { useNavigate } from 'react-router-dom'

import EditUserForm from './EditUserForm'
import AddUserForm from './AddUserForm'

const UsersList = () => {
  const { data, error, isLoading, refetch } = useGetUsersListQuery()
  const [updateProfile] = useUpdateProfileMutation()
  const [deleteUser] = useDeleteUserMutation()
  const [addSignup] = useAddSignupMutation()
  const [openEditForm, setOpenEditForm] = useState(false)
  const [openAddUserForm, setOpenAddUserForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const navigate = useNavigate()

  const handleEditClick = (user) => {
    setSelectedUser(user)
    setOpenEditForm(true)
  }

  const handleCloseEditForm = () => {
    setOpenEditForm(false)
    setSelectedUser(null)
  }

  const handleOpenAddUserForm = () => {
    setOpenAddUserForm(true)
  }

  const handleCloseAddUserForm = () => {
    setOpenAddUserForm(false)
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
        refetch()
      } else {
        console.error('User ID (_id) is missing')
      }
    } catch (err) {
      console.error('Failed to delete user:', err)
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
        onClick={handleOpenAddUserForm}
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
                    sx={{ color: green[600] }}
                  >
                    <RemoveRedEyeIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleEditClick(user)}
                    sx={{ color: blue[600] }}
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
        <EditUserForm
          open={openEditForm}
          handleClose={handleCloseEditForm}
          user={selectedUser}
          updateProfile={updateProfile}
        />
      )}

      <AddUserForm
        open={openAddUserForm}
        handleClose={handleCloseAddUserForm}
        addSignup={addSignup}
        refetch={refetch}
      />

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
