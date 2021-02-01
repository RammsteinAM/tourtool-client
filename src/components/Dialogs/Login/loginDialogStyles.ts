import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    root: {
    },
    paper: {
        width: '720px',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        height: '500px',
    },
    leftPart: {
        backgroundColor: '#333333',
        width: '40%',
        color: '#ffffff',
        padding: '90px 38px'
    },
    mainPart: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '60%',
    },
    mainContent: {
        height: '100%',
        padding: '0px 72px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',

    },
    footer: {
        alignSelf: 'flex-end',
        margin: '4px 24px 12px 4px',
        // position: 'absolute',
        // bottom: 0,
        // right: 0,
        // padding: '4px',
        // backgroundColor: '#ffffff88',
    }
}));

export default styles;