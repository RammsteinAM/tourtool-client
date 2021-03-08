import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    tournamentGameContainer: {
        width: '100%',
        marginTop: theme.spacing(1),
        textAlign: 'center'
    },
    tournamentGameContainerHeader: {
        width: "100%",
        height: "56px",
        backgroundColor: "#333333",
        color: "#c5c8cb",
        borderRadius: "2px 2px 0 0",
        padding: "0 24px",
    },

    paper: {
        width: '720px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px 72px',
        height: '500px',
        '& > div': {
            marginTop: 14,
        }
    },    
    cardRoot: {
        width: "100%",
        boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
        display: "flex",
        flexDirection: "column",
        borderRadius: "0",
    },
    cardContent: {
        // display: 'flex',
        // fontWeight: 200,
        // flexDirection: 'column',
        // color: '#ffffff',
        // justifyContent: 'space-between',
        // height: 'calc(100% - 50px)',
        // cursor: 'pointer',
        padding: 0,
    },
    cardActions: {
        height: '48px',
        justifyContent: 'space-between',
    },
    dialogButton: {
        color: 'rgba(0,0,0,.54)',
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    
}));

export default styles;