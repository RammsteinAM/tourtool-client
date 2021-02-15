import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    playerFormField: {
        '& .MuiInputBase-root': {
            fontWeight: 400,
            fontSize: 13,
        }
    },
    textField: {
        marginTop: 6,
        '& .MuiFormLabel-asterisk': {
            display: 'none',
        },
        '& .MuiInputLabel-root': {
            fontSize: '14px',
            fontWeight: '400',
        },
        '& .MuiInput-underline:hover:before': {
            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
        }

    },
    playerFormFieldContainer: {
        display: "flex",
        margin: "0 16px 16px",
        alignItems: "baseline",
        color: "#9b9b9b",
        fontSize: 13,
    },
    playerFormFieldNumber: {
        color: "#9b9b9b",
        marginRight: 6,
        marginTop: 16,
    },    
    playerFormGroupSelect: {
        listStyle: 'none',
        display: 'flex',
        padding: '0 0 0 12px',
        margin: 0,
    },
    playerFormGroupSelectItem: {
        cursor: 'pointer',
        color: "#404040",
        padding: "4px 8px",
        verticalAlign: "middle",
        fontSize: "15px",
        height: '28px',
        userSelect: 'none',
    },
    playerFormGroupSelectItemSeleced: {
        backgroundColor: '#8ebd5e',
        color: '#ffffff',
        transition: theme.transitions.create(['color', 'background-color'], {
            duration: '0.2s', easing: 'ease-out'
        })
    },
    playerFormGroupSelectItemSelecedNeutral: {
        backgroundColor: '#e0e0e0',
        transition: theme.transitions.create('background-color', {
            duration: '0.2s', easing: 'ease-out'
        })
    },
    
}));

export default styles;