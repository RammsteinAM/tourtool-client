import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    dialog: {
        width: 474,
        '& .MuiDialogContent-root': {
            padding: '26px',
        }
    },
    dialogContent: {
        backgroundImage: 'linear-gradient(-180deg,#a1e157,#8bc34a)',
    },
    container: {
        color: "#ffffff",
        width: "100%",
        cursor: "pointer",
        height: "250px",
        outline: "2px dashed #ffffff",
        padding: "72px 32px 32px",
        fontSize: "20px",
        textAlign: "center",
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    dialogButton: {
        color: 'rgba(0,0,0,.54)',
        paddingLeft: '16px',
        paddingRight: '16px',
    },

}));

export default styles;