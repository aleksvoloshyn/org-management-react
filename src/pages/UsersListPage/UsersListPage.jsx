import UsersList from '../../components/UsersList'
import css from './usersListPage.module.scss'

const UsersListPage = () => {
  return (
    <div className={css.usersListPage}>
      <UsersList />
    </div>
  )
}

export default UsersListPage
