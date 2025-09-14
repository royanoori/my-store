import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1446AA' },
    secondary: { main: '#FAAE2E' },
    background: { default: '#f5f5f5', paper: '#fff' },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1446AA' },
    secondary: { main: '#FAAE2E' },
    background: { default: '#121212', paper: '#1d1d1d' },
  },
});
