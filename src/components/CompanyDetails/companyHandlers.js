import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import {
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} from '../../redux/companiesApi'

export const useCompanyHandlers = (id, company) => {
  const navigate = useNavigate()
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

  return {
    deleteDialogOpen,
    modalError,
    openEditModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleDeleteDialogOpen,
    handleDeleteDialogClose,
    handleEditClick,
    handleDeleteClick,
    formikEdit,
  }
}
