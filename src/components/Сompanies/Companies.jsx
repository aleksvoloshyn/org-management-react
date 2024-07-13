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
  Button,
  Modal,
  TextField,
  IconButton,
  Box,
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
  useGetCompaniesQuery,
  useGetCompaniesAdminQuery,
  useDeleteCompanyMutation,
} from '../../redux/companiesApi'
import { useCompanyHandlers } from './useCompanyHandlers'
import { useCompanyForm } from './useCompanyForm'


const Companies = () => {
  const {
    currentUser,
    isCurrentUserLoading,
    currentUserError,
    openAddModal,
    openEditModal,
    selectedCompany,
    modalError,
    deleteDialogOpen,
    companyToDelete,
    handleOpenAddModal,
    handleCloseAddModal,

    handleCloseEditModal,
    handleDeleteDialogOpen,
    handleDeleteDialogClose,
    handleEditClick,
    handleDetailsClick,
  } = useCompanyHandlers()

  const { formikAdd, formikEdit } = useCompanyForm(
    handleCloseAddModal,
    handleCloseEditModal,
    selectedCompany
  )

  const isAdmin = currentUser?.isAdmin

  const {
    data: companies,
    error: companiesError,
    isLoading: isCompaniesLoading,
  } = useGetCompaniesQuery()

  const {
    data: companiesAdmin,
    error: companiesAdminError,
    isLoading: isCompaniesAdminLoading,
  } = useGetCompaniesAdminQuery(undefined, {
    skip: !isAdmin,
  })

  const companiesData = isAdmin ? companiesAdmin : companies

  const [deleteCompany] = useDeleteCompanyMutation()

  const handleDeleteClick = async () => {
    try {
      await deleteCompany(companyToDelete).unwrap()
      handleDeleteDialogClose()
    } catch (err) {
      console.error('Failed to delete company:', err)
    }
  }

  if (
    isCurrentUserLoading ||
    isCompaniesLoading ||
    (isAdmin && isCompaniesAdminLoading)
  )
    return <CircularProgress />
  if (currentUserError || companiesError || (isAdmin && companiesAdminError))
    return <Typography color="error">Error loading companies</Typography>

  const columns = [
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'address', label: 'Address', minWidth: 120 },
    { id: 'serviceOfActivity', label: 'Service of Activity', minWidth: 150 },
    { id: 'numberOfEmployees', label: 'Employees', minWidth: 80 },
    { id: 'description', label: 'Description', minWidth: 200 },
    { id: 'type', label: 'Type', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 150 },
  ]

  const sortedCompanies = companiesData.slice().sort((a, b) => {
    const nameCompare = a.name.localeCompare(b.name)
    if (nameCompare !== 0) return nameCompare
    return a.serviceOfActivity.localeCompare(b.serviceOfActivity)
  })

  return (
    <Box sx={{ width: '100%', overflowY: 'auto' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddModal}
        sx={{ display: 'block', mb: 3 }}
      >
        + Add New Company
      </Button>

      <TableContainer component={Paper} sx={{ overflowY: 'auto' }}>
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
            {sortedCompanies.map((company) => (
              <TableRow key={company._id}>
                <TableCell sx={{ padding: '8px', fontSize: '1 em' }}>
                  {company.name}
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{
                      color: red[600],
                      fontSize: '0.75rem',
                      display: 'block',
                    }}
                  >
                    {currentUser.isAdmin === false
                      ? ' my company'
                      : company?.owner?.nick_name || '! no owner !'}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>{company.address}</TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  {company.serviceOfActivity}
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  {company.numberOfEmployees}
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  {company.description}
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>{company.type}</TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <IconButton
                    onClick={() => handleDetailsClick(company._id)}
                    sx={{ color: green[600] }}
                  >
                    <RemoveRedEyeIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleEditClick(company, formikEdit)}
                    sx={{ color: blue[600] }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteDialogOpen(company._id)}
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

      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="add-company-modal-title"
        aria-describedby="add-company-modal-description"
      >
        <Box sx={modalBoxStyle}>
          <Typography id="add-company-modal-title" variant="h6" component="h2">
            Add New Company
          </Typography>
          <form onSubmit={formikAdd.handleSubmit} style={addCompanyFormStyle}>
            {modalError && <Typography color="error">{modalError}</Typography>}
            <TextField
              name="name"
              label="Company Name"
              value={formikAdd.values.name}
              onChange={formikAdd.handleChange}
              error={formikAdd.touched.name && Boolean(formikAdd.errors.name)}
              helperText={formikAdd.touched.name && formikAdd.errors.name}
              fullWidth
              margin="normal"
            />
            <TextField
              name="address"
              label="Address"
              value={formikAdd.values.address}
              onChange={formikAdd.handleChange}
              error={
                formikAdd.touched.address && Boolean(formikAdd.errors.address)
              }
              helperText={formikAdd.touched.address && formikAdd.errors.address}
              fullWidth
              margin="normal"
            />
            <TextField
              name="serviceOfActivity"
              label="Service of Activity"
              value={formikAdd.values.serviceOfActivity}
              onChange={formikAdd.handleChange}
              error={
                formikAdd.touched.serviceOfActivity &&
                Boolean(formikAdd.errors.serviceOfActivity)
              }
              helperText={
                formikAdd.touched.serviceOfActivity &&
                formikAdd.errors.serviceOfActivity
              }
              fullWidth
              margin="normal"
            />
            <TextField
              name="numberOfEmployees"
              label="Number of Employees"
              value={formikAdd.values.numberOfEmployees}
              onChange={formikAdd.handleChange}
              error={
                formikAdd.touched.numberOfEmployees &&
                Boolean(formikAdd.errors.numberOfEmployees)
              }
              helperText={
                formikAdd.touched.numberOfEmployees &&
                formikAdd.errors.numberOfEmployees
              }
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="Description"
              value={formikAdd.values.description}
              onChange={formikAdd.handleChange}
              error={
                formikAdd.touched.description &&
                Boolean(formikAdd.errors.description)
              }
              helperText={
                formikAdd.touched.description && formikAdd.errors.description
              }
              fullWidth
              margin="normal"
            />
            <TextField
              name="type"
              label="Type"
              value={formikAdd.values.type}
              onChange={formikAdd.handleChange}
              error={formikAdd.touched.type && Boolean(formikAdd.errors.type)}
              helperText={formikAdd.touched.type && formikAdd.errors.type}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Add Company
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="edit-company-modal-title"
        aria-describedby="edit-company-modal-description"
      >
        <Box sx={modalBoxStyle}>
          <Typography id="edit-company-modal-title" variant="h6" component="h2">
            Edit Company
          </Typography>
          <form onSubmit={formikEdit.handleSubmit} style={addCompanyFormStyle}>
            {modalError && <Typography color="error">{modalError}</Typography>}
            <TextField
              name="name"
              label="Company Name"
              value={formikEdit.values.name}
              onChange={formikEdit.handleChange}
              error={formikEdit.touched.name && Boolean(formikEdit.errors.name)}
              helperText={formikEdit.touched.name && formikEdit.errors.name}
              fullWidth
              margin="normal"
            />
            <TextField
              name="address"
              label="Address"
              value={formikEdit.values.address}
              onChange={formikEdit.handleChange}
              error={
                formikEdit.touched.address && Boolean(formikEdit.errors.address)
              }
              helperText={
                formikEdit.touched.address && formikEdit.errors.address
              }
              fullWidth
              margin="normal"
            />
            <TextField
              name="serviceOfActivity"
              label="Service of Activity"
              value={formikEdit.values.serviceOfActivity}
              onChange={formikEdit.handleChange}
              error={
                formikEdit.touched.serviceOfActivity &&
                Boolean(formikEdit.errors.serviceOfActivity)
              }
              helperText={
                formikEdit.touched.serviceOfActivity &&
                formikEdit.errors.serviceOfActivity
              }
              fullWidth
              margin="normal"
            />
            <TextField
              name="numberOfEmployees"
              label="Number of Employees"
              value={formikEdit.values.numberOfEmployees}
              onChange={formikEdit.handleChange}
              error={
                formikEdit.touched.numberOfEmployees &&
                Boolean(formikEdit.errors.numberOfEmployees)
              }
              helperText={
                formikEdit.touched.numberOfEmployees &&
                formikEdit.errors.numberOfEmployees
              }
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="Description"
              value={formikEdit.values.description}
              onChange={formikEdit.handleChange}
              error={
                formikEdit.touched.description &&
                Boolean(formikEdit.errors.description)
              }
              helperText={
                formikEdit.touched.description && formikEdit.errors.description
              }
              fullWidth
              margin="normal"
            />
            <TextField
              name="type"
              label="Type"
              value={formikEdit.values.type}
              onChange={formikEdit.handleChange}
              error={formikEdit.touched.type && Boolean(formikEdit.errors.type)}
              helperText={formikEdit.touched.type && formikEdit.errors.type}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Update Company
            </Button>
          </form>
        </Box>
      </Modal>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this company?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const addCompanyFormStyle = {
  display: 'flex',
  flexDirection: 'column',
}

export default Companies
