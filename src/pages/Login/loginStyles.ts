import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing(1, 2, 0),
        minWidth: '250px',
        '&:active': {
            boxShadow: 'none',
        }
    },
    textField: {
        '& .MuiFormLabel-asterisk': {
            display: 'none',
        },
        '& .MuiInput-underline:hover:before': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
        }

    },
    forgotPasswordLink: {
        textAlign: 'right',
        fontSize: '11px',
        marginTop: '10px',
        '& a': {
            color: '#9d9d9d',
        }
    }
}));

export default styles;