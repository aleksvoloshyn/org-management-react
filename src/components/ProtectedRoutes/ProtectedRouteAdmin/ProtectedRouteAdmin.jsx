import { useGetCurrentUserQuery } from '../../../redux/usersApi'

const ProtectedRouteAdmin = ({ element: Component, adminOnly, ...rest }) => {
  const { data: currentUser, isLoading } = useGetCurrentUserQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (adminOnly && !currentUser?.isAdmin) {
    return <div>No Access. You need admin rights to see usersList</div>
  }

  return <Component {...rest} />
}

export default ProtectedRouteAdmin
