import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    // container: {
    //     width: 
    // },
    gameRow: {
        display: "grid",
        gridTemplateColumns: "calc(50% - 110px) 220px calc(50% - 110px)",
        height: "50px",
    },
    scoreContainer: {
        width: '100px',
    }
}));

export default styles;