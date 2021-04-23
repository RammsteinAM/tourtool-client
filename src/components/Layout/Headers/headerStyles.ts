import { createStyles, makeStyles, fade } from '@material-ui/core/styles';

const drawerWidth = 220;

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: '13px 24px',
    },
    appBar: {
      zIndex: theme.zIndex.drawer - 1,
      paddingLeft: theme.spacing(7),
      width: `calc(100% - ${theme.spacing(7)})`,
      color: '#9b9b9b',
      backgroundColor: '#ffffff',
      maxHeight: '110px',
      transition: `${theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })}, max-height 500ms`,
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
    appBarHide: {
      maxHeight: '0px',
      transition: `${theme.transitions.create(['height', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      })}, max-height 300ms`,
    },
    exitFullScreenButtonContainer: {
      top: "0",
      right: "0",
      width: "40px",
      height: "40px",
      padding: "20px",
      position: "fixed",
      backgroundColor: "#fafafa",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderBottomLeftRadius: "10px",
      boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
    },
    exitFullScreenButton: {
      color: '#000000',
      width: '28px',
      height: '28px',
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
    tournamentName: {
      fontSize: '24px',
      fontWeight: 400,
      color: '#404040',
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
    sortIconButton: {
      padding: 4,
      margin: 0,
      color: '#8ebd5e'
    },
    checkboxLabel: {
      fontSize: '13px',
      color: '#000000'
    },
    checkbox: {
      marginRight: '2px',
    },
    headerHomeRoot: {
      display: 'block',
      padding: '13px 24px 4px 13px',
    },
    headerHomeRow: {
      display: 'flex'
    },
    actionsContainer: {
      marginTop: '8px',
      fontSize: "13px",
      textTransform: "uppercase",

      display: 'flex',
      '& > div:not(:last-child)': {
        paddingRight: 40,
      }
    },
    selectContainer: {
      display: 'flex',
      alignItems: 'center',
      '& > div': {
        paddingTop: 4,
        paddingRight: 4,
        display: 'inline',
        lineHeight: '10px'
      },
      '& $selectContainerIcon': {
        paddingTop: 0,
      },
    },
    selectContainerIcon: {

    },
    select: {
      fontSize: 13,
      marginLeft: 8,
      minWidth: 120,
      '& .MuiInputBase-input': {
        paddingBottom: 0,
        '&:focus': {
          backgroundColor: 'transparent'
        }
      },

    },
    menuItem: {
      fontSize: 13
    },
    icon: {
      cursor: 'pointer'
    },
  }),
);


export default styles;