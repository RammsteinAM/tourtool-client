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
        '&.disabled': {
            color: 'rgba(0, 0, 0, 0.38)'
        }
    },
    formLabel: {
        marginBottom: 8,
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
    dypConfigPaper: {
        maxWidth: '790px',
        margin: '24px auto 0',
        borderRadius: 0,
        paddingBottom: 20,
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
    formTextFieldSuffix: {
        minWidth: '55px',
        marginLeft: 8,
    },
    formSelect: {
        minWidth: 139,
        marginBottom: 8,
    },
    menuPaper: {
        maxHeight: '200px'
    },
    cardListContainer: {
        display: "flex",
        flexFlow: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingTop: "60px",
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
        margin: '20px',
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
    },
    playerFormCheckbox: {
        margin: '0 !important',
        '& .MuiFormControlLabel-label': {
            fontSize: 13,
        }
    },
    eliminationBracketCardsContainer: {
        display: 'flex',
        paddingLeft: '250px',
    },
    eliminationCardsContainer: {
        display: 'flex',
        paddingLeft: '26px',
        marginTop: theme.spacing(1),
    },
    gameColumn: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
    },
    gameColumnHeader: {
        textAlign: 'center',
        marginBottom: '28px',
        fontSize: '14px',
        color: '#bdbdbd',
    },
    gameColumnContent: {
        height: 'calc(100% - 50px)',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        '& > div:not(:last-child)': {
            marginBottom: '10px',
        }
    },
    gameBetweenColumnsSpace: {
        width: "80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        margin: "43px 0 -3px 0",
        zIndex: -1,
        '& div': {
            borderColor: "#e0e0e0"
        }
    },
    gameCard: {
        width: "215px",
        height: "86px",
        backgroundColor: "#333333",
        color: "#ffffff",
        borderRadius: "2px",
        overflow: "hidden",
        boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
        padding: "15px 46px 15px 17px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: 'relative',
        '&:hover': {
            '& $gameCardEnterResult': {
                opacity: 1,
            }
        }
    },
    gameCardScore: {
        top: "0",
        right: "0",
        width: "46px",
        bottom: "0",
        display: "flex",
        position: "absolute",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "10px 0",
        backgroundColor: "#333",
    },
    gameCardTable: {
        backgroundColor: "#8ebd5e",
    },
    gameCardEnterResult: {
        backgroundColor: "rgba(0,0,0,.6)",
        cursor: 'pointer',
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0,
        transition: 'opacity 200ms',
    },
    gameCardEnterResultBtn: {
        backgroundColor: "#e16f3d",
        display: "inline",
        padding: "6px"
    },
    gameColumnWithThirdPlace: {
        position: 'relative',
    },
    gameCardThirdPlace: {
        position: 'absolute',
        top: '150px',
    },
    gameCardBye: {
        width: "215px",
        height: "86px",
        backgroundColor: "#333333",
        color: "#767d84",
        borderRadius: "2px",
        overflow: "hidden",
        boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
        padding: "15px 17px 15px 17px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
    },
    loser: {
        color: "#767d84",
        textDecoration: "line-through",
    },
    gameBetweenColumnSpaceItem: {
        width: "80px",
        position: "relative",
    },
    gameConnectiongLines_Top: {
        borderTop: '2px solid',
        width: "calc(50% - 6px)",
        height: "2px",
        position: "absolute",
        top: "0",
        left: "0",
    },
    gameConnectiongLines_TopCorner: {
        borderTop: '2px solid',
        borderRight: '2px solid',
        width: "8px",
        height: "8px",
        borderTopRightRadius: "4px",
        position: "absolute",
        left: "34px",
    },
    gameConnectiongLines_MiddleV: {
        borderRight: '2px solid',
        width: "2px",
        height: "calc(100% - 16px)",
        display: "flex",
        alignItems: "flex-end",
        position: "absolute",
        left: "40px",
        top: "8px",
    },
    gameConnectiongLines_MiddleH: {
        borderTop: '2px solid',
        width: "calc(50% - 1px)",
        height: "2px",
        position: "absolute",
        right: "0",
        top: "50%",
    },
    gameConnectiongLines_Bottom: {
        borderBottom: '2px solid',
        width: "calc(50% - 6px)",
        height: "2px",
        position: "absolute",
        bottom: "0",
        left: "0",
    },
    gameConnectiongLines_BottomCorner: {
        borderBottom: '2px solid',
        borderRight: '2px solid',
        width: "8px",
        height: "8px",
        borderBottomRightRadius: "4px",
        position: "absolute",
        bottom: "0",
        left: "34px",
    },
    dypConfigItemContainer: {
        display: 'flex',
        padding: '20px 20px 0',
        alignItems: 'center',
    },
    dypConfigItemIcon: {
        margin: 10,
        fontSize: 24,
        color: '#bdbdbd',
    },
    dypConfigSelect: {
        height: '20px',
        fontSize: '13px',
    },
    dypConfigSelectMenuPaper: {
        maxHeight: '280px',
    },
    dypConfigSelectMenuList: {
        '& li': {
            fontSize: '13px',
        }
    },
}));

export default styles;