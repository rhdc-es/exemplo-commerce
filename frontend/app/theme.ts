import { PaletteMode, ThemeOptions, createTheme, responsiveFontSizes } from '@mui/material';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64b5f6',
      contrastText: '#ffffff',
    },
    background: mode === 'light'
      ? { default: '#e3f2fd', paper: '#ffffff' }
      : { default: '#0d47a1', paper: '#1565c0' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '16px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
        },
      },
    },
  },
});

export const createAppTheme = (mode: PaletteMode) => responsiveFontSizes(createTheme(getDesignTokens(mode)));
