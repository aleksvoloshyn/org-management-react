import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
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
import { green, red } from '@mui/material/colors'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import {
  useGetCompaniesQuery,
  useAddCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} from '../../redux/companiesApi'

const Companies = () => {
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [modalError, setModalError] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [companyToDelete, setCompanyToDelete] = useState(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setIsEditing(false)
    setSelectedCompany(null)
    setModalError(null)
  }

  const handleDeleteDialogOpen = (id) => {
    setCompanyToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteDialogClose = () => {
    setCompanyToDelete(null)
    setDeleteDialogOpen(false)
  }

  const { data, error, isLoading } = useGetCompaniesQuery()

  const [addCompany] = useAddCompanyMutation()
  const [updateCompany] = useUpdateCompanyMutation()
  const [deleteCompany] = useDeleteCompanyMutation()

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      serviceOfActivity: '',
      numberOfEmployees: '',
      description: '',
      type: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      serviceOfActivity: Yup.string().required('Required'),
      numberOfEmployees: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      type: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isEditing && selectedCompany) {
          await updateCompany({ id: selectedCompany._id, ...values }).unwrap()
        } else {
          await addCompany(values).unwrap()
        }
        resetForm()
        handleClose()
      } catch (err) {
        setModalError('Failed to save company')
        console.error('Failed to save company:', err)
      }
    },
    enableReinitialize: true,
  })

  const handleEditClick = (company) => {
    setSelectedCompany(company)
    formik.setValues({
      name: company.name,
      address: company.address,
      serviceOfActivity: company.serviceOfActivity,
      numberOfEmployees: company.numberOfEmployees,
      description: company.description,
      type: company.type,
    })
    setIsEditing(true)
    handleOpen()
  }

  const handleDeleteClick = async () => {
    try {
      await deleteCompany(companyToDelete).unwrap()
      handleDeleteDialogClose()
    } catch (err) {
      console.error('Failed to delete company:', err)
    }
  }

  if (isLoading) return <CircularProgress />
  if (error)
    return <Typography color="error">Error loading companies</Typography>

  const columns = [
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'address', label: 'Address', minWidth: 120 },
    { id: 'serviceOfActivity', label: 'Service of Activity', minWidth: 200 },
    { id: 'numberOfEmployees', label: 'Employees', minWidth: 80 },
    { id: 'description', label: 'Description', minWidth: 200 },
    { id: 'type', label: 'Type', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 100 },
  ]

  return (
    <Box sx={{ width: '100%', overflowY: 'auto' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ display: 'block', mb: 3 }}
      >
        + Add New Company
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
                  sx={{
                    fontWeight: 'bold',
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((company) => (
              <TableRow key={company._id}>
                <TableCell sx={{ padding: '8px' }}>{company.name}</TableCell>
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
                    onClick={() => handleEditClick(company)}
                    sx={{ color: green[600] }}
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
        open={open}
        onClose={handleClose}
        aria-labelledby="add-company-modal-title"
        aria-describedby="add-company-modal-description"
      >
        <Box sx={modalBoxStyle}>
          <Typography id="add-company-modal-title" variant="h6" component="h2">
            {isEditing ? 'Edit Company' : 'Add New Company'}
          </Typography>
          <form onSubmit={formik.handleSubmit} style={addCompanyFormStyle}>
            {modalError && <Typography color="error">{modalError}</Typography>}
            <TextField
              name="name"
              label="Company Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
              margin="normal"
            />
            <TextField
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              fullWidth
              margin="normal"
            />
            <TextField
              name="serviceOfActivity"
              label="Service of Activity"
              value={formik.values.serviceOfActivity}
              onChange={formik.handleChange}
              error={
                formik.touched.serviceOfActivity &&
                Boolean(formik.errors.serviceOfActivity)
              }
              helperText={
                formik.touched.serviceOfActivity &&
                formik.errors.serviceOfActivity
              }
              fullWidth
              margin="normal"
            />
            <TextField
              name="numberOfEmployees"
              label="Number of Employees"
              value={formik.values.numberOfEmployees}
              onChange={formik.handleChange}
              error={
                formik.touched.numberOfEmployees &&
                Boolean(formik.errors.numberOfEmployees)
              }
              helperText={
                formik.touched.numberOfEmployees &&
                formik.errors.numberOfEmployees
              }
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              fullWidth
              margin="normal"
            />
            <TextField
              name="type"
              label="Type"
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isEditing ? 'Update Company' : 'Add Company'}
            </Button>
          </form>
        </Box>
      </Modal>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-company-dialog-title"
        aria-describedby="delete-company-dialog-description"
      >
        <DialogTitle id="delete-company-dialog-title">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-company-dialog-description">
            Are you sure you want to delete this company?
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

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const addCompanyFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}

export default Companies
