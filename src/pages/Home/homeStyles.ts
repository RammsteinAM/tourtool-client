import { makeStyles, fade } from '@material-ui/core/styles';
const drawerWidth = 220;
const styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
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
    textField: {
        '& .MuiFormLabel-asterisk': {
            display: 'none',
        },
        '& .MuiInput-underline:hover:before': {
            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
        }

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