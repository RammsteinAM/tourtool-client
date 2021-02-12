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
        margin: "0 16px 16px",
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
    },
    playerFormCheckbox: {
        margin: 0,
        '& .MuiFormControlLabel-label': {
            fontSize: 13,
        }
    },
    playerFormGroupSelect: {
        listStyle: 'none',
        display: 'flex',
        padding: '0 0 0 12px',
        margin: 0,
    },
    playerFormGroupSelectItem: {
        cursor: 'pointer',
        color: "#404040",
        padding: "4px 8px",
        verticalAlign: "middle",
        fontSize: "15px",
        height: '28px',
        userSelect: 'none',
    },
    playerFormGroupSelectItemSeleced: {
        backgroundColor: '#8ebd5e',
        color: '#ffffff',
        transition: theme.transitions.create(['color', 'background-color'], {
            duration: '0.2s', easing: 'ease-out'
        })
    },
    playerFormGroupSelectItemSelecedNeutral: {
        backgroundColor: '#e0e0e0',
        transition: theme.transitions.create('background-color', {
            duration: '0.2s', easing: 'ease-out'
        })
    },
    eliminationCardsContainer: {
        display: 'flex',
        paddingLeft: '250px',
    },
    eliminationSidebar: {
        width: "250px",
        height: "calc(100% - 66px)",
        zIndex: 1199,
        position: "fixed",
        top: "66px",
        marginLeft: "-24px",
        overflowY: "auto",
        transition: "left .2s cubic-bezier(.645,.045,.355,1)",
        backgroundColor: "hsla(0,0%,98%,.97)",
        boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)"
    },
    eliminationSidebarHeader: {
        height: "22px",
        fontSize: "11px",
        borderTop: "1px solid #e0e0e0",
        paddingTop: "9px",
        paddingLeft: "12px",
    },
    eliminationSidebarHeaderNumberSign: {
        paddingLeft: "12px",
        width: "12px",
        textAlign: "right",
        marginRight: "17px"
    },
    eliminationSidebarItem: {
        display: 'flex',
        fontSize: '12px',
        padding: "6px 20px",
        cursor: "move",
    },
    eliminationSidebarItemNumber: {
        color: '#9b9b9b',
        display: "inline-block",
        //width: "12px",
        marginRight: "17px",
        textAlign: "right"
    },
    eliminationSidebarItemPlayer: {
        flexGrow: 1,
    },
    eliminationSidebarItemPlayerBye: {
        flexGrow: 1,
        color: '#9b9b9b',
    },
    eliminationSidebarItemIcon: {
        marginTop: '-4px',
        color: '#727272',
        height: '16px',
        width: '24px',
    },
    gameColumn: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
    },
    gameColumnHeader: {
        textAlign: 'center',
        marginBottom: '30px',
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
        margin: "45px 0 -5px 0",
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
}));

export default styles;