import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
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
  button: {
    marginTop: theme.spacing(2),
  },
  dialogContent: {
    padding: theme.spacing(3),
  },
  dialogForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  red: {
    color: 'red',
  },
}))
