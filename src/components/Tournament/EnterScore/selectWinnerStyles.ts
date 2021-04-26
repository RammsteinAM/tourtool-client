import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    
    matchContainer: {
        display: "grid",
        textAlign: 'center',
        textTransform: 'uppercase',
        gridTemplateColumns: "calc(50% - 60px) 120px calc(50% - 60px)",
        paddingTop: "20px",
        userSelect: 'none',
    },
    winnerSelectButton: {
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        whiteSpace: 'nowrap',
    },
    tieDisabled: {
        opacity: .25,
        cursor: 'default',
    },
    playerName: {
        padding: '5px 20px',
        overflow: "hidden",
        maxWidth: "90%",
        textOverflow: "ellipsis",
    },
    winnerSelected: {
        borderRadius: "15px",
        backgroundColor: "#e16f3d",
    },
}));

export default styles;