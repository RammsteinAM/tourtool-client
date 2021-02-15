import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    importDialogHeader: {
        fontSize: '20px',
        color: "#ffffff",
        backgroundColor: '#333333',
        height: "54px",
        width: "100%",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    importParticipantsDialog: {
        width: 458,
    },
    importParticipantsDialogContent: {
        backgroundColor: "#fafafa",
        padding: "24px",
        color: "#404040",
    },
    importParticipantsDescription: {
        margin: "0 0 24px",
        width: "410px",
        fontSize: '13px',
        color: '#404040',
    },
    importParticipantsTextField: {
        fontSize: '13px',
        color: '#404040',
        outline: 'none',
    },
    dialogHeaderIcon: {
        color: '#ffffff',
    },
    submitDialogButton: {
        color: 'rgba(0,0,0,.54)',
        paddingLeft: '16px',
        paddingRight: '16px',
    },
}));

export default styles;