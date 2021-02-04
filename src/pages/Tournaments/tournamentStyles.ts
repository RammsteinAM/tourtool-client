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
        paddingBottom: 10,
    },
    playerFormPaper: {
        maxWidth: '412px',
        margin: '24px auto 0',
        borderRadius: 0,        
        paddingBottom: 20,
    },
    playerFormField: {
        '& .MuiInputBase-root': {
            fontWeight: 400,
            fontSize: 13,
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
        margin: '7px',
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
    playerFormFieldContainer: {
        display: "flex",
        margin: "16px",
        alignItems: "baseline",
        color: "#9b9b9b",
        fontSize: 13,
    },
    playerFormFieldNumber: {
        color: "#9b9b9b",
        marginRight: 6,
        marginTop: 16,
    },
    playerFormHeader: {
        color: "#ffffff",
        borderRadius: "2px 2px 0 0",
        height: "145px",
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 200,
    }
}));

export default styles;