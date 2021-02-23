import { createStyles, makeStyles, fade } from '@material-ui/core/styles';

const drawerWidth = 220;

const styles = makeStyles((theme) =>
  createStyles({
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
      '& .MuiToolbar-root': {
        padding: '13px 24px',
      },
      '&.MuiPaper-elevation4': {
        boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
      }
    },
    appBarShift: {
      paddingLeft: theme.spacing(7),
      width: `calc(100% - ${drawerWidth - theme.spacing(7)}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    title: {
      fontSize: '24px',
      fontWeight: 400,
      flexGrow: 1,
      display: 'none',
      userSelect: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    button: {
      height: '40px',
      padding: '0 30px',
      borderRadius: '2px',
      marginLeft: '10px',
    },
    iconButton: {
      padding: 8,
      margin: 0,
      '&:hover': {
        backgroundColor: 'initial',
      }
    },
    checkboxLabel: {
      fontSize: '13px',
      color: '#000000'
    },
    checkbox: {
      marginRight: '2px',
    },
  }),
);


export default styles;