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
      minHeight: 66,
      // necessary for content to be below app bar
      //...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: 0,
      // height: '100vh',
      position: 'relative',
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
    panelHeader: {
      backgroundColor: '#333333',
      height: '66px',
      color: '#c5c8cb',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '4px',
    },
    panelBody: {
      height: '100%',
      backgroundColor: '#ffffff',
      width: '362px',
      padding: '20px',
    },
    fullScreen: {
      width: 0,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer - 1,
    },
    logoContainer: {
      overflow: 'hidden',
      height: '26px',
      transition: 'width 0.2s linear'
      // '&:after': {
      //   content: "' '",
      //   position: "absolute",
      //   width: "13px",
      //   height: "26px",
      //   backgroundColor: "#333333",
      //   right: "17px",
      //   zIndex: 324234,
      //   top: "0",
      // }
    },
    logoContainerClosed: {
      width: '26px',
    },
    logoContainerOpen: {
      width: '182px',
    },
    logoMain: {
      
      display: 'block',
      position: 'relative',
      opacity: 1,
    },
    logo: {
      display: 'block',
      position: 'relative',
      opacity: 1,
      transition:'opacity 200ms linear'
    },
    logoVisible: {
      
      display: 'block',
      position: 'relative',
      opacity: 1,
      transition:'opacity 200ms linear'
    }
  }),
);


export default styles;