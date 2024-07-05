import Divider from '@mui/material/Divider'
import { Button } from '@mui/material'
import { useGetProfileQuery } from '../../redux/usersApi'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import userPic from './../../assets/userpic.png'
import css from './profile.module.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: '50px',
    width: '60%',
    height: '100%',
    margin: '20px auto',
    padding: theme.spacing(3),
    textAlign: 'center',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.shape.borderRadius,
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  info: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0,
    },
  },
}))

const Profile = () => {
  const classes = useStyles()
  const { data: profile, error, isLoading } = useGetProfileQuery()

  if (isLoading) return <CircularProgress />
  if (error) return <div>Error: {error.message}</div>
  if (!profile) return null

  return (
    <div className={css.profileWrapper}>
      <Card className={classes.root}>
        <img src={userPic} alt="userPic" width={60} height={60} />
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            {profile.first_name} {profile.last_name}
            <Divider />
          </Typography>
          <Typography variant="body1" className={classes.info}>
            <b>Nickname:</b> {profile.nick_name}
          </Typography>
          <Typography variant="body1" className={classes.info}>
            <b>Description:</b> {profile.description}
          </Typography>
          <Typography variant="body1" className={classes.info}>
            <b>Position:</b> {profile.position}
          </Typography>
          <Typography variant="body1" className={classes.info}>
            <b>Email:</b> {profile.email}
          </Typography>
          <Typography variant="body1" className={classes.info}>
            <b>Phone:</b> {profile.phone_number}
          </Typography>
          {/* В реальном приложении не отображайте пароль */}
        </CardContent>
      </Card>
      <Button disabled={isLoading} variant="contained" color="info">
        Edit profile
      </Button>
    </div>
  )
}

export default Profile
