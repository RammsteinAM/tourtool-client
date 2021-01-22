import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import theme from '../../styles/theme';

const drawerWidth = 220;

const styles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer - 1,
      paddingLeft: theme.spacing(7),
      width: `calc(100% - ${theme.spacing(7)})`,
      color: '#9b9b9b',
      backgroundColor: '#ffffff',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      
    },
    appBarShift: {
      paddingLeft: theme.spacing(7),
      width: `calc(100% - ${drawerWidth - theme.spacing(7)}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
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
      width: '363px',
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
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    listItems: {
      color: '#c5c8cb',
    },
    listItemText: {
      fontSize: '14px',
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
      backgroundColor: '#ffffff',
      padding: '20px',
    }
  }),
);


export default styles;