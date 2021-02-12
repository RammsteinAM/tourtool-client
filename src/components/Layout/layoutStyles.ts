import { createStyles, makeStyles, fade } from '@material-ui/core/styles';

const drawerWidth = 220;

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    paper: {
      justifyContent: 'space-between',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create(['width', 'transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
      backgroundColor: '#333333',
    },
    drawerSettingsOpen: {
      //left: '200px',
      transform: 'translateX(362px)',
    },
    drawerSettingsClose: {
      transform: 'translateX(0px)',
    },
    drawerClose: {
      transition: theme.transitions.create(['width', 'transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: '#333333',
      overflowX: 'hidden',
      width: theme.spacing(7),
    },
    sidePanelOpen: {
      width: '364px',
      transition: theme.transitions.create('width', {
        duration: '0.2s',
      }),
      overflowX: 'hidden',
    },
    sidePanelClose: {
      width: 0,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      minHeight: 46,
      // necessary for content to be below app bar
      //...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      //height: 'calc(100vh - 64px)',
    },
    listItems: {
      color: '#c5c8cb',
    },
    listItemText: {
      fontSize: '14px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    icons: {
      color: '#c5c8cb',
    },
    settingsHeader: {
      backgroundColor: '#333333',
      height: '66px',
      color: '#c5c8cb',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '4px',
    },
    settingsBody: {
      height: '100%',
      backgroundColor: '#ffffff',
      padding: '20px',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer - 1,
    },
  }),
);


export default styles;