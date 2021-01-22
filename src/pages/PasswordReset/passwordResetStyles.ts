import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    // root: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     minWidth: 500,

    // },
    // mainContainer: {
    //     padding: theme.spacing(6, 20, 4, 20),
    // },
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
        width: '720px',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing(3, 2, 2),
        height: '35px',
        minWidth: '100px',
        borderRadius: '2px',
        '&:hover': {
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
        '& .MuiFormLabel-asterisk': {
            display: 'none',
        },

    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        height: '500px',
    },
    leftPart: {
        backgroundColor: '#333333',
        width: '40%',
        color: '#ffffff',
        padding: '90px 38px'
    },
    mainPart: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '60%',
    },
    mainContent: {
        height: '100%',
        padding: '0px 72px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',

    },
}));

export default styles;