import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetCurrentUserQuery } from '../../redux/usersApi'

export const useCompanyHandlers = () => {
  const navigate = useNavigate()
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [modalError, setModalError] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [companyToDelete, setCompanyToDelete] = useState(null)

  const {
    data: currentUser,
    isLoading: isCurrentUserLoading,
    error: currentUserError,
  } = useGetCurrentUserQuery()

  const handleOpenAddModal = () => setOpenAddModal(true)
  const handleCloseAddModal = () => {
    setOpenAddModal(false)
    setModalError(null)
  }

  const handleOpenEditModal = () => setOpenEditModal(true)
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
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

  const handleEditClick = (company, formikEdit) => {
    setSelectedCompany(company)
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

  const handleDetailsClick = (id) => {
    navigate(`/companies/${id}`)
  }

  return {
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
    handleOpenEditModal,
    handleCloseEditModal,
    handleDeleteDialogOpen,
    handleDeleteDialogClose,
    handleEditClick,
    handleDetailsClick,
  }
}
