import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  phone_number: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  first_name: Yup.string().required('Required'),
  nick_name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  position: Yup.string().required('Required'),
})

export default validationSchema
