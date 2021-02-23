import React, { Component } from 'react';
import { withSnackbar, VariantType, WithSnackbarProps } from 'notistack';


// interface IProps extends WithSnackbarProps { message: string, variant: VariantType }

// class SnackbarDisplay extends Component<IProps, {}> {
//   componentDidMount() {
//     this.props.enqueueSnackbar(this.props.message, { variant: this.props.variant });
//   }
//   componentDidUpdate() {
//     this.props.enqueueSnackbar(this.props.message, { variant: this.props.variant });
//   }

//   public render() {
//     return null;
//   };
// };

// export default withSnackbar(SnackbarDisplay);