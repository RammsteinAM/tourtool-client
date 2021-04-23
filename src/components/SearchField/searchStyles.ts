import { createStyles, makeStyles, fade } from '@material-ui/core/styles';

const drawerWidth = 220;

const styles = makeStyles((theme) =>
  createStyles({
    searchContainer: {
      overflow: 'hidden',
      marginLeft: 'auto',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: 'auto',
        width: 'auto',
      },
    },
    search: {
      position: 'relative',
      borderRadius: 0,
      display: 'flex',
      flexDirection: 'row',
      marginRight: '8px',
      transition: "transform .3s cubic-bezier(.165,.84,.44,1)",
      transform: "translateX(222px)",
      width: '240px',
    },
    searchOpen: {      
      transform: "translateX(0px)",
    },
    icon: {
      cursor: 'pointer'
    },
    searchIcon: {
      cursor: 'pointer',
      color: '#727272',
      fontSize: 27,
    },
  }),
);


export default styles;