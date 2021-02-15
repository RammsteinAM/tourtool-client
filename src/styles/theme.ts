import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#8ebd5e',
      },
      secondary: {
        light: '#0066ff',
        main: '#e16f3d',
        contrastText: '#ffffff',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
      
    },
    typography: {
      fontFamily: ['Mardoto', 'sans-serif'].join(','),
    },
    // transitions: {
    //     duration: {
    //         leavingScreen: 500
    //     }
    // }
  });

  export default theme;