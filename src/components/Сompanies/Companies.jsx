import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  useGetCompaniesQuery,
  useAddCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} from '../../redux/companiesApi'
import {
  Button,
  TextField,
  Box,
  Modal,
  Typography,
  IconButton,
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CircularProgress from '@mui/material/CircularProgress'

// import css from './companies.module.scss'

const Companies = () => {
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setIsEditing(false)
    setSelectedCompany(null)
  }
  const {
    data,
    isError,
    isLoading: queryLoading,
    error: queryError,
  } = useGetCompaniesQuery()

  useEffect(() => {
    if (queryError) {
      setError(queryError)
    }
  }, [queryError])

  useEffect(() => {
    setIsLoading(queryLoading)
  }, [queryLoading])

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
          await updateCompany({ id: selectedCompany.id, ...values }).unwrap()
        } else {
          await addCompany(values).unwrap()
        }
        resetForm()
        handleClose()
      } catch (err) {
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

  const handleDeleteClick = async (id) => {
    try {
      await deleteCompany(id).unwrap()
    } catch (err) {
      console.error('Failed to delete company:', err)
    }
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  const rows = data
    ? data.map((company) => ({
        id: company._id,
        name: company.name,
        address: company.address,
        serviceOfActivity: company.serviceOfActivity,
        numberOfEmployees: company.numberOfEmployees,
        description: company.description,
        type: company.type,
      }))
    : []

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 80,
      headerClassName: 'header-bold',
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 2,
      minWidth: 300,
      headerClassName: 'header-bold',
    },
    {
      field: 'serviceOfActivity',
      headerName: 'Service of Activity',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'numberOfEmployees',
      headerName: 'Employees',
      flex: 1,
      minWidth: 100,
    },
    { field: 'description', headerName: 'Description', flex: 2, minWidth: 150 },
    { field: 'type', headerName: 'Type', flex: 1, minWidth: 80 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ]

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        + Add New Company
      </Button>

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

      <Box sx={{ flexGrow: 1, overflow: 'auto', mt: 2 }}>
        <DataGrid
          // hideFooter
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          autoHeight
          sx={{
            fontSize: '14px',
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              whiteSpace: 'normal !important',
              wordBreak: 'break-word !important',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
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
