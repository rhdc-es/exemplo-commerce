import { PaletteMode, ThemeOptions } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#1565c0', contrastText: '#ffffff' },
          secondary: { main: '#64b5f6', contrastText: '#ffffff' },
          background: { default: '#e3f2fd', paper: '#ffffff' },
          text: { primary: '#000000', secondary: '#333333' }
        }
      : {
          primary: { main: '#1565c0', contrastText: '#ffffff' },
          secondary: { main: '#64b5f6', contrastText: '#ffffff' },
          background: { default: '#0d47a1', paper: '#1565c0' },
          text: { primary: '#ffffff', secondary: '#e0e0e0' }
        })
  }
});
