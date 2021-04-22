import { makeStyles, fade } from '@material-ui/core/styles';
const drawerWidth = 220;
const styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        margin: theme.spacing(3, 2, 2),
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
    buttonContainer: {
        margin: "auto",
        display: "flex",
        height: "calc(100vh - 100px)",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    cardListContainer: {
        display: "flex",
        flexFlow: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingTop: "60px",
        margin: "0 auto"
    },
}));

export default styles;