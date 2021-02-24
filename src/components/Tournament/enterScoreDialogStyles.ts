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
    dialogHeader: {
        paddingTop: '35px',
        paddingBottom: '20px',
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
    },
    pointsInputContainer: {
        width: "100%",
        display: "flex",
        position: "relative",
        padding: "0px 24px",
        margin: "auto",
        alignItems: 'center',
    },
    pointsInput: {
        position: 'relative',
        width: 'calc(100% - 16px)',
        overflow: 'hidden',
        margin: '0 16px',
        height: '40px',
    },
    pointsMiddle: {
        display: "inline-block",
        fontSize: "20px",
        lineHeight: "28px",
        textAlign: "center",
        alignSelf: 'center',
    },
    scoreItem: {
        position: 'absolute',
        top: '10px',
        fontSize: "14px",
        fontWeight: 200,
        width: "24px",
        textAlign: "center",
        transition: 'left 0.25s cubic-bezier(0.4, 0, 0.25, 0.7), right 0.25s cubic-bezier(0.4, 0, 0.25, 0.7)',
        padding: "0 3px",
        marginLeft: "9px",
        marginRight: "9px",
        display: "inline-block",
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
    }
}));

export default styles;