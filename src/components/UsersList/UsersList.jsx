import React from 'react'
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
} from '@mui/material'
import { green, red } from '@mui/material/colors'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { useGetUsersListQuery } from '../../redux/usersApi'

const UsersList = () => {
  const { data, error, isLoading } = useGetUsersListQuery()

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
        // onClick={(handleOpen)}
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
                    // onClick={() => handleEditClick(user)}
                    sx={{ color: green[600] }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    // onClick={() => handleDeleteClick(user._id)}
                    sx={{ color: red[600] }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default UsersList
