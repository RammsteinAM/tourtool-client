import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.        
        marginTop: theme.spacing(1),
    },
    playerFormHeader: {
        color: "#ffffff",
        borderRadius: "2px 2px 0 0",
        height: "145px",
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 200,
    },
    dypConfigPaper: {
        maxWidth: '790px',
        margin: '24px auto 0',
        borderRadius: 0,
        paddingBottom: 20,
    },
    dypConfigItemContainer: {
        display: 'flex',
        padding: '20px 20px 0',
        alignItems: 'center',
    },
    dypConfigItemIcon: {
        margin: 10,
        fontSize: 24,
        color: '#bdbdbd',
    },
    dypConfigSelect: {
        height: '20px',
        fontSize: '13px',
    },
    dypConfigSelectMenuPaper: {
        maxHeight: '280px',
    },
    dypConfigSelectMenuList: {
        '& li': {
            fontSize: '13px',
        }
    },
}));

export default styles;