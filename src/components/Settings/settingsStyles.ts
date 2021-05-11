import { createStyles, makeStyles, fade } from '@material-ui/core/styles';

const drawerWidth = 220;

const styles = makeStyles((theme) =>
  createStyles({
    formBlock: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 12,
      paddingBottom: 32,
      paddingLeft: 6,
      // padding: '6px 24px',
      '& .MuiFormControlLabel-root': {
        margin: 0
      },
      '&.disabled': {
        color: 'rgba(0, 0, 0, 0.38)'
      }
    },
    formLabel: {
      marginBottom: 8,
      fontSize: 16,
    },
    formSelect: {
      minWidth: 139,
      marginBottom: 8,
    },
    label: {
      marginBottom: '20px',
    },
    menuPaper: {
      maxHeight: '200px'
    },
    formTextField: {
      marginBottom: 12,
      '& .MuiFormLabel-asterisk': {
        display: 'none',
      },
      '& .MuiInputLabel-root': {
        fontSize: '14px',
        fontWeight: '400',
      },
      '& .MuiInput-underline:hover:before': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
      },
    },
    formTextFieldSmall: {
      marginBottom: 12,
      width: 60,
      '& .MuiFormLabel-asterisk': {
        display: 'none',
      },
      '& .MuiInputLabel-root': {
        fontSize: '14px',
        fontWeight: '400',
      },
      '& .MuiInput-underline:hover:before': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
      },
      '& input': {
        textAlign: 'center',
      }
    },
    formTextFieldSuffix: {
      minWidth: '55px',
      marginLeft: 8,
    },
  }),
);


export default styles;