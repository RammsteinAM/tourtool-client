import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        textAlign: 'center'
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
        //height: '35px',        
        minWidth: '250px',
        borderRadius: '2px',
        '&:hover': {
        },
        '&:active': {
            boxShadow: 'none',
        },
    },
    textField: {
        marginTop: 6,
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

    }
}));

export default styles;