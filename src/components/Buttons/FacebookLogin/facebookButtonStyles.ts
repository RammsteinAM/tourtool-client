import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    button: {
        color: 'white',
        backgroundColor: '#1877F2',
        borderColor: '#1877F2',
        margin: theme.spacing(3, 2, 2),
        height: '35px',
        minWidth: '100px',
        borderRadius: '2px',
        '&:hover': {
            backgroundColor: '#1368d6',
            borderColor: '#1368d6',
        },
        '&:active': {
            boxShadow: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
}));

export default styles;