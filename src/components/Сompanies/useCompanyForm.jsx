import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  useAddCompanyMutation,
  useUpdateCompanyMutation,
} from '../../redux/companiesApi'

export const useCompanyForm = (
  handleCloseAddModal,
  handleCloseEditModal,
  selectedCompany
) => {
  const [addCompany] = useAddCompanyMutation()
  const [updateCompany] = useUpdateCompanyMutation()

  const commonSchema = {
    name: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    serviceOfActivity: Yup.string().required('Required'),
    numberOfEmployees: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
  }

  const formikAdd = useFormik({
    initialValues: {
      name: '',
      address: '',
      serviceOfActivity: '',
      numberOfEmployees: '',
      description: '',
      type: '',
    },
    validationSchema: Yup.object(commonSchema),
    onSubmit: async (values, { resetForm }) => {
      try {
        await addCompany(values).unwrap()
        resetForm()
        handleCloseAddModal()
      } catch (err) {
        console.error('Failed to save company:', err)
      }
    },
  })

  const formikEdit = useFormik({
    initialValues: {
      name: selectedCompany?.name || '',
      address: selectedCompany?.address || '',
      serviceOfActivity: selectedCompany?.serviceOfActivity || '',
      numberOfEmployees: selectedCompany?.numberOfEmployees || '',
      description: selectedCompany?.description || '',
      type: selectedCompany?.type || '',
    },
    validationSchema: Yup.object(commonSchema),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (selectedCompany) {
          await updateCompany({ id: selectedCompany._id, ...values }).unwrap()
        }
        resetForm()
        handleCloseEditModal()
      } catch (err) {
        console.error('Failed to save company:', err)
      }
    },
    enableReinitialize: true,
  })

  return { formikAdd, formikEdit }
}
