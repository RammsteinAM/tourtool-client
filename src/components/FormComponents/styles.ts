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
        padding: '6px 24px',
    },
    formLabel: {
        marginBottom: 12,
        fontSize: 16,
    },
    paper: {
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
    
    formSubheader: {
        color: "#9b9b9b",
        padding: "0 16px",
        overflow: "hidden",
        height: '38px',
        transition: theme.transitions.create('height', {
            duration: '0.2s',
          })
    },
    formSubheaderTitle: {
        display: "flex",
        justifyContent: "initial",
        alignItems: "center",
        margin: '7px 0',
        fontSize: "16px",
        '& button': {
            color: '#9b9b9b',
            padding: 0,
        },
        '& .MuiIconButton-root:hover': {
            backgroundColor: 'initial',
        }
    },
    formSubheaderText: {
        fontSize: "13px",
        margin: '0 7px'
    },
    subheaderExpand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    subheaderExpandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export default styles;