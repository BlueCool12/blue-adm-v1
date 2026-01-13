import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  defaultColorScheme: 'light',
  cssVariables: { colorSchemeSelector: 'data', },
  colorSchemes: { light: true, dark: true },
  typography: {
    fontFamily: [
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      'system-ui',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Pretendard';
          font-display: swap;
        }
      `,
    },
  },  
});