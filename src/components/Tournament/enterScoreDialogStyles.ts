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
        borderTop: '1px solid rgba(0, 0, 0, 0.12)'
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
        padding: "40px 0",
    },
    pointsInputContainer: {
        width: "100%",
        display: "flex",
        position: "relative",
        padding: "0px 20px",
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
        verticalAlign: "top",
    },
    scoreItem: {
        position: 'absolute',
        top: '10px',
        fontSize: "14px",
        fontWeight: 300,
        width: "24px",
        textAlign: "center",
        transition: "color 50ms",
        padding: "0 3px",
        marginLeft: "9px",
        marginRight: "9px",
        display: "inline-block",
        backgroundColor: "transparent",
        cursor: "pointer",
        zIndex: 5,
    },
    scoreItemSelected: {
        position: "absolute",
        height: "30px",
        width: "30px",
        backgroundColor: "#e16f3d",
        top: "5px",
        borderRadius: "50%"
    },
    iconButtons: {
        color: '#ffffff',
        width: '22px',
        height: '22px',
    }
}));

export default styles;