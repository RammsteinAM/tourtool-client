import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    // container: {
    //     width: 
    // },
    gameRowContainer: {

        '&:not(:last-child)': {
            borderBottom: '1px solid #e0e0e0'
        }
    },
    gameRow: {
        display: "grid",
        gridTemplateColumns: "calc(50% - 110px) 220px calc(50% - 110px)",
        height: "50px",
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
        textAlign: 'center',
        textTransform: 'uppercase',
        cursor: 'pointer',
        userSelect: 'none',
        backgroundColor: '#ffffff',
        padding: 0,
        border: 'none',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
        '&:hover $enterScoreButtonScoreDisplay': {
            backgroundColor: '#e0e0e0',
        },
        '&:hover $winningScoreLeft:before': {
            borderRightColor: '#e0e0e0',
        },
        '&:hover $winningScoreRight:after': {
            borderLeftColor: '#e0e0e0',
        },
        '&:focus': {
            outline: '1px dashed #e16f3d',
            outlineOffset: '-1px',
        }
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
    enterScoreButton: {
        backgroundColor: "transparent",
        fontSize: "13px",
        height: "100%",
        width: "100%",
        transition: 'background-color 0.15s',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    enterResultButton: {
        color: "#9b9b9b",
        fontSize: "13px",
    },
    gameListRowEnterScoreContainerHidden: {
        position: 'fixed', visibility: 'hidden',
        //transition: "max-height 0.5s cubic-bezier(0.7, 0, 0.4, 0.78)",
        overflow: "hidden",
        //animation: `$heightIncrease 1s ${theme.transitions.easing.easeInOut}`
    },
    gameListRowEnterScoreContainer: {
        transition: "max-height 0.33s cubic-bezier(0.7, 0, 0.4, 0.78)",
        overflow: "hidden",
        //animation: `$heightIncrease 1s ${theme.transitions.easing.easeInOut}`
    },
    enterScoreContentContainer: {
        position: 'relative',
        '& > div:focus:before': {
            top: "6px",
            left: "6px",
            width: "calc(100% - 12px)",
            height: "calc(100% - 12px)",
            content: "' '",
            outline: "2px dashed #e16f3d",
            position: "absolute",
        }
    },

    tournamentGameRound: {
        backgroundColor: "#fafafa",
        color: "#9b9b9b",
        fontSize: "13px",
        fontWeight: 500,
        height: "38px",
        lineHeight: "19px",
        margin: "0",
        padding: "10px 0 0 16px",
    },
    enterScoreButtonScoreDisplay: {
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
}));

export default styles;