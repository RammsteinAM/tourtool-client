import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    paddingBottom: '30px',
    textAlign: 'center',
    '& .MuiTextField-root': {
      marginTop: 12
    }
  },
  paper: {
    width: '720px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 72px',
    height: '500px',
    '& > div': {
      marginTop: 14,
    }
  },
  button: {
    margin: theme.spacing(1, 2, 0),
    minWidth: '250px',
    borderRadius: '2px',
    '&:active': {
      boxShadow: 'none',
    },
  },
  logoutBtn: {
    margin: 'auto auto 0 auto',
  },
  textField: {
    '& .MuiFormLabel-asterisk': {
      display: 'none',
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px',
      fontWeight: '400',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
    }

  },
  dialogHeader: {
    color: "#ffffff",
    backgroundImage: 'linear-gradient(0deg,#d41313 5%,#f34040)',
    height: "171px",
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogButton: {
    color: 'rgba(0,0,0,.54)',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  dialog: {
    width: 474,
    '& .MuiDialogTitle-root': {
      paddingBottom: 0,
    }
  },
}));

export default styles;