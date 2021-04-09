import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    eliminationSidebar: {
        maxHeight: '360px',
        overflowY: 'auto',
    },
    eliminationSidebarHeader: {
        height: "22px",
        fontSize: "11px",
        borderTop: "1px solid #e0e0e0",
        paddingTop: "9px",
        paddingLeft: "12px",
    },
    item: {
        display: 'flex',
        fontSize: '13px',
        padding: "0 16px",
        justifyContent: "space-between",
        alignItems: "center",
    },

    dragIcon: {
        color: '#c5c8cb',
        cursor: 'move',
    },
    iconButton: {
        width: '40px',
        height: '40px',
    },
    name: {
        color: '#ffffff',
        display: "inline-block",
        textAlign: "left",
        flexGrow: 1,
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