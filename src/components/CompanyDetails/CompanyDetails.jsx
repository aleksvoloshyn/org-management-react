import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} from '../../redux/companiesApi'
import {
  CircularProgress,
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  TextField,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const CompanyDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: company, error, isLoading } = useGetCompanyByIdQuery(id)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [modalError, setModalError] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [updateCompany] = useUpdateCompanyMutation()
  const [deleteCompany] = useDeleteCompanyMutation()

  const handleOpenEditModal = () => setOpenEditModal(true)
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
    setModalError(null)
  }

  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true)
  const handleDeleteDialogClose = () => setDeleteDialogOpen(false)

  const handleEditClick = () => {
    formikEdit.setValues({
      name: company.name,
      address: company.address,
      serviceOfActivity: company.serviceOfActivity,
      numberOfEmployees: company.numberOfEmployees,
      description: company.description,
      type: company.type,
    })
    handleOpenEditModal()
  }

  const handleDeleteClick = async () => {
    try {
      await deleteCompany(id).unwrap()
      handleDeleteDialogClose()
      navigate('/companies')
    } catch (err) {
      console.error('Failed to delete company:', err)
    }
  }

  const formikEdit = useFormik({
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
        await updateCompany({ id, ...values }).unwrap()
        resetForm()
        handleCloseEditModal()
      } catch (err) {
        setModalError('Failed to save company')
        console.error('Failed to save company:', err)
      }
    },
    enableReinitialize: true,
  })

  if (isLoading) return <CircularProgress />
  if (error) return <Typography color="error">Error loading company</Typography>

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper sx={{ width: '100%', maxWidth: 800, padding: 4, marginBottom: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {company.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Address:</strong> {company.address}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Service of Activity:</strong> {company.serviceOfActivity}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Number of Employees:</strong> {company.numberOfEmployees}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Description:</strong> {company.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Type:</strong> {company.type}
        </Typography>
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/companies')}
          >
            <KeyboardBackspaceIcon />
            Back
          </Button>
          <IconButton onClick={handleEditClick} sx={{ color: 'blue' }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDeleteDialogOpen} sx={{ color: 'red' }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Подтвердите удаление'}
        </DialogTitle>
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
          <form onSubmit={formikEdit.handleSubmit} style={editCompanyFormStyle}>
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

const editCompanyFormStyle = {
  display: 'flex',
  flexDirection: 'column',
}

export default CompanyDetails
