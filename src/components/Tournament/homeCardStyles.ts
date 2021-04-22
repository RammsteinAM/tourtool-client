import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    cardRoot: {
        borderRadius: 2,
        boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
        flexGrow: 0,
        flexShrink: 0,
        width: '450px',
        height: '123px',
        margin: '12px',
        display: 'flex',
    },
    cardIconContainer: {
        width: 88,
        display: 'flex',
        fontWeight: 200,
        flexDirection: 'column',
        color: '#ffffff',
        justifyContent: 'center',
    },
    cardIcon: {
        alignSelf: 'center',
        fill: '#ffffff',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '14px 10px 5px 10px',
    },
    cardTitle: {
        maxWidth: '300px',
        flexGrow: 0.9,
    },
    cardActions: {
        borderTop: '1px solid #e0e0e0',
        height: '50px',
        justifyContent: 'flex-end',

    },
    name: {
        fontSize: '20px',
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 362,
        '& button': {
            padding: 7,
            cursor: 'pointer',
        }
    },
    date: {
        color: '#bdbdbd',
        fontSize: 13,
        cursor: 'default',
    },
    progressContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

export default styles;