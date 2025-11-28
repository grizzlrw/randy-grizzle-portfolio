import { createTheme } from '@mui/material/styles';
//import { ThemeOptions } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     mode: 'light', // or 'dark'
//     primary: { main: '#1976d2' },
//     secondary: { main: '#dc004e' },
//     // ...add more customizations as needed
//   },
//   // typography, spacing, etc.
// });

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#034C8C', // '#0d47a1',
       50: '#ecf5fe',
      100: '#c6e2fb',
      200: '#9ecffa',
      300: '#76bcf9',
      400: '#76bcf9',
      500: '#034c8c',
      600: '#003666',
      700: '#00213d',
      800: '#00101f',
      900: '#00101f',
    },
    secondary: {
      main: '#F2CA50', // '#865D0B',
      50: '#fdf9ed',
      100: '#f8edc8',
      200: '#f5e1a3',
      300: '#f2d57d',
      400: '#f0ca56',
      600: '#f2ca50',
      700: '#f4c125',
      800: '#e7b009',
      900: '#c29306',
      500: '#9c7603',
    },
  },
  typography: {
    fontFamily: 'var(--font-nunito-sans), var(--font-geist-sans), var(--font-geist-mono), Arial, Helvetica, sans-serif',
  },
});


// export const themeOptions: ThemeOptions = {
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#0d47a1',
//     },
//     secondary: {
//       main: '#a16f0d',
//     },
//   },
// };

export default theme;