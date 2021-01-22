import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    button: {
        color: 'white',
        backgroundColor: '#1877F2',
        borderColor: '#1877F2',
        margin: theme.spacing(1, 2, 0),
        height: '35px',
        minWidth: '250px',
        borderRadius: '2px',
        '&:hover': {
            backgroundColor: '#1368d6',
            borderColor: '#1368d6',
        },
        '&:active': {
            boxShadow: 'none',
        }
    },
}));

export default styles;