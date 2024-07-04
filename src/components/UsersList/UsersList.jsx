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
} from '@mui/material'
import { green, red } from '@mui/material/colors'

import { useGetUsersListQuery } from '../../redux/usersApi'

const UsersList = () => {
  const { data, error, isLoading } = useGetUsersListQuery()

  if (isLoading) return <CircularProgress />
  if (error) return <Typography color="error">Error loading users</Typography>
  const columns = [
    { id: 'fullName', label: 'Full Name', minWidth: 150 },
    { id: 'nickName', label: 'Nickname', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 200 },
    { id: 'position', label: 'Position', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'phoneNumber', label: 'Phone Number', minWidth: 150 },
    { id: 'rights', label: 'Rights', minWidth: 100 },
  ]
  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table>
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
              <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
              <TableCell>{user.nick_name}</TableCell>
              <TableCell>{user.description}</TableCell>
              <TableCell>{user.position}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell>
                <Typography
                  style={{ color: user.isAdmin ? red[500] : green[500] }}
                >
                  {user.isAdmin ? 'Admin' : 'User'}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UsersList
