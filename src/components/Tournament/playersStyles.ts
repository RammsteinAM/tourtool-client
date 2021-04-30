import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    
    playerFormGroupSelectItemSelecedNeutral: {
        backgroundColor: '#e0e0e0',
        transition: theme.transitions.create('background-color', {
            duration: '0.2s', easing: 'ease-out'
        })
    },
    
}));

export default styles;