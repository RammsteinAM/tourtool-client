import ReactDOM from 'react-dom';
import { SnackbarProvider, withSnackbar, VariantType } from 'notistack';

const toast = {
  success: function (msg: string) {
    this.toast(msg, 'success');
  },
  warning: function (msg: string) {
    this.toast(msg, 'warning');
  },
  error: function (msg: string) {
    this.toast(msg, 'error');
  },
  toast: function (msg: string, variant: VariantType) {
    const Display = withSnackbar<any>(({ message, enqueueSnackbar }) => {
      enqueueSnackbar(message, { variant });
      return null;
    });
    const mountPoint = document.getElementById('snackbarhelper');
    ReactDOM.render(
      <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
        <Display message={msg} variant={variant} />
      </SnackbarProvider>,
      mountPoint)
  }
};

export default toast;