import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    button: {
        color: 'black',
        backgroundColor: '#fff',
        borderColor: '#fff',
        margin: theme.spacing(1, 2, 0),
        height: '35px',
        minWidth: '250px',
        borderRadius: '2px',
        '&:hover': {
            backgroundColor: '#fafafa',
            borderColor: '#fafafa',
        },
        '&:active': {
            boxShadow: 'none',
        },
    },
}));

export default styles;