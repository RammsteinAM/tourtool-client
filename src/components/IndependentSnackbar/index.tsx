import ReactDOM from 'react-dom';
import { SnackbarProvider, withSnackbar, VariantType, WithSnackbarProps  } from 'notistack';
import React, { Component, useEffect } from 'react';
// import SnackbarDisplay from './SnackbarDisplay';

const mountPoint = document.getElementById('snackbarhelper');

const Display = withSnackbar<{ message: string, variant: VariantType, enqueueSnackbar: any, closeSnackbar: any }>(({ message, variant, enqueueSnackbar }) => {
  useEffect(() => {
    enqueueSnackbar(message, { variant });
  })
  return null;
});


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
  toast: (msg: string, variant: VariantType) => {
    ReactDOM.render(
      <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
        <Display message={msg} variant={variant} />
      </SnackbarProvider>,
      mountPoint)
  }
};

export default toast;