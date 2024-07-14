export const handleDelete = async (profile, deleteUser, navigate) => {
  try {
    if (profile?._id) {
      await deleteUser({ id: profile._id }).unwrap()
      navigate('/users')
    } else {
      console.error('User ID (_id) is missing')
    }
  } catch (error) {
    console.error('Failed to delete profile', error)
  }
}

export const handleSubmit = async (values, profile, updateProfile, setOpen) => {
  try {
    if (profile?._id) {
      await updateProfile({ _id: profile._id, ...values }).unwrap()
      setOpen(false)
    } else {
      console.error('User ID (_id) is missing')
    }
  } catch (error) {
    console.error('Failed to update profile', error)
  }
}
