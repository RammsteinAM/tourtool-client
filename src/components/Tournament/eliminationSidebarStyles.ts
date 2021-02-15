import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    eliminationSidebar: {
        width: "250px",
        height: "calc(100% - 66px)",
        zIndex: 1199,
        position: "fixed",
        top: "66px",
        marginLeft: "-24px",
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
}));

export default styles;