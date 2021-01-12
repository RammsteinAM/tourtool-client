import { makeStyles } from '@material-ui/core/styles';

const loginStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: 500,

    },
    mainContainer: {
        padding: theme.spacing(6, 20, 4, 20),
    },
    card: {
        marginTop: theme.spacing(4),
        display: 'block',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        border: 'none',
        borderRadius: '10px'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '280px'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        textAlign: 'center'
    },
    button: {
        boxShadow: 'none',
        margin: theme.spacing(3, 2, 2),
        textTransform: 'none',
        height: '35px',
        minWidth: '100px',
        borderRadius: '20px',
        '&:hover': {
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
    progress: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    textField: {
        border: 'none',
        '& .MuiInputBase-root': {
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            boxShadow: '0px 3px 6px #CCCCCC',
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

export default loginStyles;