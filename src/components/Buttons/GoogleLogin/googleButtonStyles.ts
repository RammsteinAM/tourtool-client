import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    button: {
        color: 'black',
        backgroundColor: '#fff',
        borderColor: '#fff',
        margin: theme.spacing(3, 2, 2),
        height: '35px',
        minWidth: '100px',
        borderRadius: '2px',
        '&:hover': {
            backgroundColor: '#fafafa',
            borderColor: '#fafafa',
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