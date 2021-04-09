import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    paper: {
        width: '750px',
        margin: '34px auto 60px',
        borderRadius: 0,
        paddingTop: 50,
        paddingBottom: 50,
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    tournamentType: {
        fontSize: "35px",
        fontWeight: 200,
        letterSpacing: "2px"
    },
    tournamentTitle: {
        fontWeight: 600,
        fontSize: "32px",
        lineHeight: "29px",
        paddingTop: "0",
        marginBottom: "46px",
        marginTop: "32px",
    },
    container: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    placement: {
        fontSize: 26,
        fontWeight: 700,
        zIndex: 5,
        marginRight: 10,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    row: {
        display: "flex",
        width: '444px',
        margin: '0 auto',
        position: 'relative',
        paddingLeft: 90,
    },
    rowWithBorder: {
        position: 'relative',
        '&:after': {
            content: '" "',
            position: "absolute",
            left: "-45px",
            bottom: 0,
            width: "310px",
            borderBottom: "2px solid #e0e0e0",
        }
    },
    playerContainer: {
        zIndex: 5,
    },
    player: {
        padding: '4px 0 2px 0',
    },
    playerName: {
        fontSize: 16,
        fontWeight: 700,
        lineHeight: '18px',
    },
    playerMatches: {
        fontSize: 12,
        fontWeight: 400,
        marginRight: 4,
    },
    winnerBadge: {
        position: 'absolute',
        left: '110px',
        top: '-26px',
    },
    bottomLine: {
        position: 'absolute',
        height: '2px',
        width: '444px',
        backgroundColor: '#e0e0e0'
    }
}));

export default styles;