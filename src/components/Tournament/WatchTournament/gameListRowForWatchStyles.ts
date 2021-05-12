import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    gameRowContainer: {

        '&:not(:last-child)': {
            borderBottom: '1px solid #e0e0e0'
        }
    },
    gameRow: {
        display: "grid",
        gridTemplateColumns: "calc(50% - 110px) 220px calc(50% - 110px)",
        minHeight: "50px",
    },
    gameRowP1: {
        paddingLeft: '55px',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
    },
    gameRowP2: {
        paddingLeft: '6%',
        paddingRight: '55px',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
    },
    scoreContainer: {
        border: "none",
        padding: "0",
        textTransform: "uppercase",
        backgroundColor: "#ffffff",
        width: "120px",
        display: "flex",
        justifyContent: "center",
        justifySelf: "center",
        flexDirection: 'column',
    },
    winningScoreLeft: {
        '&:before': {
            borderBottom: "18px solid transparent",
            borderRight: "18px solid #f0f0f0",
            borderTop: "18px solid transparent",
            content: '" "',
            display: "block",
            height: "0",
            left: "-18px",
            position: "absolute",
            top: "0",
            width: "0",
        },
    },
    winningScoreRight: {
        '&:after': {
            borderBottom: "18px solid transparent",
            borderLeft: "18px solid #f0f0f0",
            borderTop: "18px solid transparent",
            content: '" "',
            display: "block",
            height: "0",
            position: "absolute",
            right: "-18px",
            top: "0",
            width: "0"
        }
    },
    emptyScoreConteiner: {
        color: "#9b9b9b",
        fontSize: "40px",
        position: 'relative',
        padding: "0 22px",
        lineHeight: '36px',
        textAlign: "center",
        alignSelf: 'center',
        display: 'grid',
    },
    tournamentGameRound: {
        backgroundColor: "#fafafa",
        color: "#9b9b9b",
        fontSize: "13px",
        fontWeight: 500,
        // height: "38px",
        lineHeight: "19px",
        margin: "0",
        padding: "10px 0 0 16px",
    },
    scoreDisplay: {
        backgroundColor: "#f0f0f0",
        color: "#404040",
        position: 'relative',
        fontSize: "16px",
        padding: "0 22px",
        lineHeight: '36px',
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
        },

    },
    addtitionalScoresDisplay: {
        color: "#404040",
        position: 'relative',
        fontSize: "11px",
        padding: "0 22px",
        lineHeight: '18px',
        textAlign: "center",
        alignSelf: 'center',
        '& span:first-child': {
            textAlign: 'right',
        },
        '& span': {
            textAlign: 'middle',
        },
        '& span:last-child': {
            textAlign: 'left',
        },

    },
    addtitionalScoreItem: {
        color: "#404040",
        position: 'relative',
        padding: "0 22px",
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
        },

    },
    loadingContainer: {
        textAlign: 'center',
        margin: 'auto',
        '& .MuiCircularProgress-root': {
            width: '24px !important',
            height: '24px !important',
        }
    },
}));

export default styles;