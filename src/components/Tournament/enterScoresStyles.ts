import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    dialog: {
        minWidth: "950px",
        color: '#ffffff',
        backgroundColor: '#333333',
        '& .MuiDialogTitle-root': {
            paddingBottom: 0,
        }
    },
    content: {
        color: '#ffffff',
        backgroundColor: '#333333',
        paddingTop: '20px',
        // animation: "gradient 3s ease infinite",
        '&:focus': {
            // background: "linear-gradient(180deg, #333333, #777777, #777777, #333333)",
            // backgroundSize: "400% 400%" 
            outline: 'none',
        },
        '&:focus $hint': {
            visibility: 'visible',
        }
    },
    contentFewWinningSets: {        
        '&:focus:before': {
            content: 'none !important',
        }
    },
    dialogHeader: {
        paddingTop: '35px',
    },
    dialogHeaderPlayer: {
        display: "inline-block",
        width: "50%",
        textAlign: "center",
        color: "#bdbdbd",
        fontWeight: 400,
        fontSize: "16px"
    },
    dialogFooter: {
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        marginTop: '40px',
    },
    dialogButton: {
        color: '#9b9b9b',
        paddingLeft: '16px',
        paddingRight: '16px',
        '&.primary': {
            color: '#ffffff',
        }
    },
    pointsContainer: {
        display: "grid",
        gridTemplateColumns: "calc(50% - 40px) 80px calc(50% - 40px)",
        padding: "4px 0",
        userSelect: 'none',
    },
    pointsInputContainer: {
        width: "100%",
        display: "flex",
        position: "relative",
        padding: "0px 24px",
        margin: "auto",
        alignItems: 'center',
        justifyContent: 'center',
    },
    pointsInput: {
        position: 'relative',
        overflow: 'hidden',
        margin: '0 16px',
        height: '40px',
    },
    pointsMiddle: {
        fontSize: "20px",
        lineHeight: "28px",
        textAlign: "center",
        alignSelf: 'center',
        display: 'grid',
        gridTemplateColumns: ' calc(50% - 9px) 18px calc(50% - 9px)',
        '& span:first-child': {
            textAlign: 'right',
        },
        '& span': {
            textAlign: 'middle',
        },
        '& span:last-child': {
            textAlign: 'left',
        }
    },
    scoreItem: {
        position: 'absolute',
        top: '10px',
        fontSize: "14px",
        fontWeight: 200,
        width: "24px",
        height: '20px',
        textAlign: "center",
        transition: 'left 0.25s cubic-bezier(0.4, 0, 0.25, 0.7), right 0.25s cubic-bezier(0.4, 0, 0.25, 0.7)',
        padding: "0 3px",
        marginLeft: "9px",
        marginRight: "9px",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "transparent",
        cursor: "pointer",
        zIndex: 8,
        '&.disabled': {
            color: '#707070',
            cursor: 'not-allowed',
        }
    },
    scoreItemSelected: {
        position: "absolute",
        height: "30px",
        width: "30px",
        backgroundColor: "#e16f3d",
        top: "5px",
        borderRadius: "50%",
        transition: 'left 0.25s cubic-bezier(0.4, 0, 0.25, 0.7), right 0.25s cubic-bezier(0.4, 0, 0.25, 0.7)',
        zIndex: 5,
    },
    iconButtons: {
        color: '#ffffff',
        width: '22px',
        height: '22px',
    },
    hint: {
        visibility: 'hidden',
        margin: "0 0 8px 24px",
        fontSize: "12px",
        color: "#909090",
        textAlign: "center",
    }
}));

export default styles;