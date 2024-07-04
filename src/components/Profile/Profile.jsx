import { useGetProfileQuery } from '../../redux/usersApi'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: 'auto',
    marginTop: 20,
    padding: 20,
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
})

const Profile = () => {
  const classes = useStyles()
  const { data: profile, error, isLoading } = useGetProfileQuery()

  if (isLoading) return <CircularProgress />
  if (error) return <div>Error: {error.message}</div>
  if (!profile) return null

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h2" className={classes.title}>
          {profile.first_name} {profile.last_name}
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Nickname: {profile.nick_name}
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Description: {profile.description}
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Position: {profile.position}
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Email: {profile.email}
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Phone: {profile.phone_number}
        </Typography>
        {/* В реальном приложении не отображайте пароль */}
      </CardContent>
    </Card>
  )
}

export default Profile
