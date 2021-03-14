import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
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
    gameColumnWithThirdPlace: {
        position: 'relative',
    },
    gameCardThirdPlace: {
        position: 'absolute',
        top: '150px',
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