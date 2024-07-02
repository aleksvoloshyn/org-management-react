import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  useGetCompaniesQuery,
  useAddCompanyMutation,
} from '../../redux/companiesSlice'
import { Button, TextField, Box, Modal, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import css from './companiesPage.module.scss'

const CompaniesPage = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { data, error, isLoading } = useGetCompaniesQuery()
  const [addCompany] = useAddCompanyMutation()

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
        await addCompany(values).unwrap()
        resetForm()
        handleClose()
      } catch (err) {
        console.error('Failed to add company:', err)
      }
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  console.log(data)

  // Преобразуем данные для использования в DataGrid
  const rows = data?.map((company) => ({
    id: company._id,
    name: company.name,
    address: company.address,
    serviceOfActivity: company.serviceOfActivity,
    numberOfEmployees: company.numberOfEmployees,
    description: company.description,
    type: company.type,
  }))

  // Определяем колонки для DataGrid
  const columns = [
    { field: 'name', headerName: 'Name', width: 120 },
    { field: 'address', headerName: 'Address', width: 250 },
    {
      field: 'serviceOfActivity',
      headerName: 'Service of Activity',
      width: 150,
    },
    {
      field: 'numberOfEmployees',
      headerName: 'Numb of Empl',
      width: 140,
    },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
  ]

  return (
    <div className={css.companiesPage}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Company
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-company-modal-title"
        aria-describedby="add-company-modal-description"
      >
        <Box className={css.modalBox}>
          <Typography id="add-company-modal-title" variant="h6" component="h2">
            Add New Company
          </Typography>
          <form onSubmit={formik.handleSubmit} className={css.addCompanyForm}>
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
              Add Company
            </Button>
          </form>
        </Box>
      </Modal>

      {/* DataGrid для отображения компаний */}
      <Box className={css.dataGridBox}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          autoHeight
        />
      </Box>
    </div>
  )
}

export default CompaniesPage
