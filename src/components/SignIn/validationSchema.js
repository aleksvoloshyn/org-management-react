import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
})

export default validationSchema
