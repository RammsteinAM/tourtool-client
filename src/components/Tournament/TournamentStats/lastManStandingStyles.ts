import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    // tournamentGameContainer: {
    //     width: '100%',
    //     marginTop: theme.spacing(1),
    //     textAlign: 'center'
    // },
    // tournamentGameContainerHeader: {
    //     width: "100%",
    //     height: "56px",
    //     backgroundColor: "#333333",
    //     color: "#c5c8cb",
    //     borderRadius: "2px 2px 0 0",
    //     padding: "0 24px",
    //     display: 'flex',
    //     justifyContent: 'flex-end',
    // },
    tournamentSidebarHeaderContainer: {
        width: "100%",
        height: "56px",
        backgroundColor: "#333333",
        color: "#c5c8cb",
        borderRadius: "2px 2px 0 0",
        position: 'relative',
        overflow: 'visible',
    },
    tournamentSidebarHeader: {
        width: "100%",
        maxHeight: "56px",
        backgroundColor: "#333333",
        color: "#c5c8cb",
        //padding: "0 24px",
        justifyContent: 'flex-start',
        flexDirection: 'column',
        position: 'absolute',
        overflow: 'hidden',        
        borderRadius: "2px 2px 0 0",
        transition: 'max-height 0.2s ease-out',
    },
    tournamentSidebarHeaderClosed: {
        // display: "flex",
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        // padding: '4px 0px',
    },
    tournamentSidebarHeaderTitle: {
        color: "#ffffff",
        paddingLeft: "16px",
        fontSize: "16px",
        display: "flex",
        height: "56px",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    tournamentSidebarHeaderTitleText: {
        flexGrow: 1,
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
    cardContent: {
        padding: 0,
        flexGrow: 1,
    },
    icons: {
        color: '#c5c8cb',
    },
    statnsTableContainer: {
        overflowX: 'auto',
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
        },
        '& td:last-child': {
            paddingRight: '6px',
        }
    },
    lmsStatsTr: {
        borderBottom: '1px solid #e0e0e0',
        height: '31px'
    },
    lmsStatsTd: {
        paddingLeft: '7px',
        width: '33px',
        textAlign: 'center',
    },
    lmsStatsHeaderTd: {
        fontWeight: 700,
        width: '33px',
        paddingLeft: '7px',
        whiteSpace: 'nowrap',
    },
    lmsStatsTdPlacement: {
        width: '10px',
        color: '#9b9b9b',
    },
    lmsStatsTdPlayer: {
        textAlign: 'left',
        width: 'auto',
    }
}));

export default styles;