import { createTheme, PaletteMode } from '@mui/material/styles';

// Create theme based on mode
export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#034C8C' : '#76bcf9',
      50: '#ecf5fe',
      100: '#c6e2fb',
      200: '#9ecffa',
      300: '#76bcf9',
      400: '#4eabf8',
      500: '#034c8c',
      600: '#003666',
      700: '#00213d',
      800: '#00101f',
      900: '#000810',
    },
    secondary: {
      main: mode === 'light' ? '#F2CA50' : '#f4c125',
      50: '#fdf9ed',
      100: '#f8edc8',
      200: '#f5e1a3',
      300: '#f2d57d',
      400: '#f0ca56',
      500: '#f2ca50',
      600: '#f4c125',
      700: '#e7b009',
      800: '#c29306',
      900: '#9c7603',
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#0a0a0a',
      paper: mode === 'light' ? '#ffffff' : '#1a1a1a',
    },
    text: {
      primary: mode === 'light' ? '#171717' : '#ededed',
      secondary: mode === 'light' ? '#525252' : '#a3a3a3',
    },
    grey: {
      50: mode === 'light' ? '#fafafa' : '#262626',
      100: mode === 'light' ? '#f5f5f5' : '#2d2d2d',
      200: mode === 'light' ? '#e5e5e5' : '#3d3d3d',
      300: mode === 'light' ? '#d4d4d4' : '#525252',
      400: mode === 'light' ? '#a3a3a3' : '#737373',
      500: mode === 'light' ? '#737373' : '#a3a3a3',
      600: mode === 'light' ? '#525252' : '#d4d4d4',
      700: mode === 'light' ? '#404040' : '#e5e5e5',
      800: mode === 'light' ? '#262626' : '#f5f5f5',
      900: mode === 'light' ? '#171717' : '#fafafa',
    },
  },
  typography: {
    fontFamily: 'var(--font-nunito-sans), var(--font-geist-sans), var(--font-geist-mono), Arial, Helvetica, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#ecf5fe' : '#1a1a1a',
          color: mode === 'light' ? '#000' : '#ededed',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// Default light theme for initial render
export const theme = getTheme('light');

export default theme;