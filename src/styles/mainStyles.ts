import { makeStyles } from '@material-ui/core/styles';

const mainStyles = makeStyles((theme) => ({
    formErrorContainer: {        
        minHeight: '20px',
    },
    formError: {
        fontSize: '12px',
        color: '#ff0000',
    },
    errorMessage: {
        fontWeight: 600,
        color: '#ff0000',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '280px'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing(3, 2, 2),
        //height: '35px',
        minWidth: '100px',
        borderRadius: '2px',
        '&:hover': {
        },
        '&:active': {
            boxShadow: 'none',
        },
    },
    progress: {
        margin: theme.spacing(1),
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    textField: {
        border: 'none',
        '& .MuiInputBase-root': {
            backgroundColor: '#FFFFFF',
        },
        '& .MuiFilledInput-underline:before': {
            content: 'none',
        },
        '& .MuiFormLabel-root': {
            color: '#bababa',
        },
        '& .MuiFormLabel-asterisk': {
            display: 'none',
        },

    }
}));

export default mainStyles;