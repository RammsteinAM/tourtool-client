import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    formBlock: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 12,
    },
    formLabel: {
        marginBottom: 12,
        fontSize: 16,
    },
    paper: {
        padding: '12px 24px',
        maxWidth: '500px',
        margin: '24px auto 0',
        borderRadius: 0,
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

    },
    formTextField: {
        marginBottom: 12,
        width: 60,
        '& .MuiFormLabel-asterisk': {
            display: 'none',
        },
        '& .MuiInputLabel-root': {
            fontSize: '14px',
            fontWeight: '400',
        },
        '& .MuiInput-underline:hover:before': {
            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
        },
        '& input': {
            textAlign: 'center',
        }

    },
    formTextFieldContainer: {
        display: "flex",
        alignItems: "baseline",
        minWidth: '130px',
    },
    formTextFieldSuffix: {
        minWidth: '55px',
        marginLeft: 8,
    },
    formSelect: {
        minWidth: 139,
    },
    menuPaper: {
        maxHeight: '200px'
    },
    cardListContainer: {
        display: "flex",
        flexFlow: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingTop: "60px",
        maxWidth: "650px",
        margin: "0 auto"
    },
    cardRoot: {
        borderRadius: 0,
        maxWidth: 345,
        boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
        flexGrow: 0,
        flexShrink: 0,
        width: '175px',
        height: '195px',
        margin: '12px',
    },
    cardContent: {
        display: 'flex',
        fontWeight: 200,
        flexDirection: 'column',
        color: '#ffffff',
        justifyContent: 'space-between',
        height: 'calc(100% - 50px)',
        cursor: 'pointer',
    },
    cardIcon: {
        alignSelf: 'flex-end',
        fill: '#ffffff',
    },
    cardTitle: {
        alignSelf: 'flex-start',
        fontSize: 22,
    },
    cardActions: {
        height: '50px',
        justifyContent: 'flex-end',
        '& button': {
            padding: 7,
            cursor: 'pointer',
        }
    },
}));

export default styles;