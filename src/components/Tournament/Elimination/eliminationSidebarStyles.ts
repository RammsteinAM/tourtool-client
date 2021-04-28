import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    eliminationSidebar: {
        width: "250px",
        height: "calc(100% - 66px)",
        zIndex: 1200,
        position: "fixed",
        top: "66px",
        overflowY: "auto",
        transition: "left .2s cubic-bezier(.645,.045,.355,1)",
        backgroundColor: "hsla(0,0%,98%,.97)",
        boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)"
    },
    eliminationSidebarHeader: {
        height: "22px",
        fontSize: "11px",
        borderTop: "1px solid #e0e0e0",
        paddingTop: "9px",
        paddingLeft: "12px",
    },
    eliminationSidebarHeaderNumberSign: {
        paddingLeft: "12px",
        width: "12px",
        textAlign: "right",
        marginRight: "17px"
    },
    eliminationSidebarItem: {
        display: 'flex',
        fontSize: '12px',
        padding: "6px 20px",
        cursor: "move",
    },
    eliminationSidebarItemNumber: {
        color: '#9b9b9b',
        display: "inline-block",
        marginRight: "17px",
        textAlign: "right"
    },
    eliminationSidebarItemPlayer: {
        flexGrow: 1,
    },
    eliminationSidebarItemPlayerBye: {
        flexGrow: 1,
        color: '#9b9b9b',
    },
    eliminationSidebarItemIcon: {
        marginTop: '-4px',
        color: '#727272',
        height: '16px',
        width: '24px',
    },
    gameCard: {
        width: "215px",
        height: "86px",
        backgroundColor: "#333333",
        color: "#ffffff",
        borderRadius: "2px",
        overflow: "hidden",
        boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
        padding: "15px 46px 15px 17px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: 'relative',
        '&:hover': {
            '& $gameCardEnterResult': {
                opacity: 1,
            }
        }
    },
    gameCardScore: {
        top: "0",
        right: "0",
        width: "46px",
        bottom: "0",
        display: "flex",
        position: "absolute",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "10px 0",
        backgroundColor: "#333",
    },
    gameCardEnterResult: {
        backgroundColor: "rgba(0,0,0,.6)",
        cursor: 'pointer',
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0,
        transition: 'opacity 200ms',
        zIndex: 2,
    },
    gameCardEnterResultBtn: {
        backgroundColor: "#e16f3d",
        display: "inline",
        padding: "6px"
    },
    gameCardBye: {
        width: "215px",
        height: "86px",
        backgroundColor: "#333333",
        color: "#767d84",
        borderRadius: "2px",
        overflow: "hidden",
        boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
        padding: "15px 17px 15px 17px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
    },
    loser: {
        color: "#767d84",
        textDecoration: "line-through",
    },
    gameCardActiveTable: {
        position: "absolute",
        width: "46px",
        backgroundColor: "#8EBD5E",
        height: "100%",
        top: "0px",
        right: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}));

export default styles;