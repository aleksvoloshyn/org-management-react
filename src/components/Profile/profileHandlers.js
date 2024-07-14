import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import {
  useUpdateProfileMutation,
  useDeleteUserMutation,
} from '../../redux/usersApi'

export const useProfileHandlers = (profile) => {
  const [open, setOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      nick_name: profile?.nick_name || '',
      description: profile?.description || '',
      position: profile?.position || '',
      email: profile?.email || '',
      phone_number: profile?.phone_number || '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phone_number: Yup.string().required('Phone number is required'),
    }),
    onSubmit: async (values) => {
      try {
        if (profile?._id) {
          await updateProfile({ _id: profile._id, ...values }).unwrap()
          setOpen(false) // Close the dialog on success
        } else {
          console.error('User ID (_id) is missing')
        }
      } catch (error) {
        console.error('Failed to update profile', error)
      }
    },
    enableReinitialize: true,
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleConfirmDeleteOpen = () => setConfirmDelete(true)
  const handleConfirmDeleteClose = () => setConfirmDelete(false)

  const handleDelete = async () => {
    try {
      if (profile?._id) {
        await deleteUser({ id: profile._id }).unwrap()
        localStorage.removeItem('token')
        navigate('../auth')
      } else {
        console.error('User ID (_id) is missing')
      }
    } catch (error) {
      console.error('Failed to delete profile', error)
    }
  }

  return {
    open,
    confirmDelete,
    isUpdating,
    isDeleting,
    formik,
    handleOpen,
    handleClose,
    handleConfirmDeleteOpen,
    handleConfirmDeleteClose,
    handleDelete,
  }
}
