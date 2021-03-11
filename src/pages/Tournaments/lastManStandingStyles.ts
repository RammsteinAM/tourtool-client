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
        display: 'flex',
        justifyContent: 'flex-end',
    },
    tournamentSidebarHeader: {
        width: "100%",
        height: "56px",
        backgroundColor: "#333333",
        color: "#c5c8cb",
        borderRadius: "2px 2px 0 0",
        //padding: "0 24px",
        display: 'flex',
        justifyContent: 'flex-end',
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
    tournamentGameRoot: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardRoot: {
        boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
        display: "flex",
        flexDirection: "column",
        borderRadius: "0",
        transition: 'width 0.3s ease-out',
    },
    tournamentGameSidebar: {
        width: "350px",
        display: "flex",
        flexDirection: "column",
        '& $cardRootSide:not(:last-child)': {
            marginBottom: '12px',
        }
    },
    cardRootSide: {
        width: "100%",
        boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
        display: "flex",
        flexDirection: "column",
        borderRadius: "0",
    },
    cardContent: {
        padding: 0,
        flexGrow: 1,
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
    icons: {
        color: '#c5c8cb',
    },
    lmsStatsTable: {
        width: "100%",
        borderCollapse: "collapse",
        borderSpacing: "0",
        fontSize: '13px',
    },
    lmsStatsThead: {
        '& td': {
            paddingTop: '8px',
            paddingBottom: '4px',
        }
    },
    lmsStatsTr: {
        borderBottom: '1px solid #e0e0e0',
        height: '31px'
    },
    lmsStatsTd: {
        paddingLeft: '7px'
    },
    lmsStatsHeaderTd: {
        fontWeight: 800,
        paddingLeft: '7px'
    },
    lmsStatsTdPlacement: {
        width: '10px',
        color: '#9b9b9b',
    }
}));

export default styles;