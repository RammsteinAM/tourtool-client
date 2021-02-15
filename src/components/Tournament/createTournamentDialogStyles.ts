import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    submitDialogHeader: {
        color: "#ffffff",
        backgroundImage: 'linear-gradient(0deg,#8bc34a 5%,#a1e057)',
        height: "171px",
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitDialogButton: {
        color: 'rgba(0,0,0,.54)',
        paddingLeft: '16px',
        paddingRight: '16px',
    },
    createTournamentDialog: {
        width: 474,
        '& .MuiDialogTitle-root': {
            paddingBottom: 0,
        }
    },
}));

export default styles;