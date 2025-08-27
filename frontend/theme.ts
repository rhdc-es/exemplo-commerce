import { PaletteMode, ThemeOptions } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#0d47a1' },
          secondary: { main: '#00695c' },
          background: { default: '#fafafa', paper: '#ffffff' },
          text: { primary: '#000000', secondary: '#333333' }
        }
      : {
          primary: { main: '#90caf9' },
          secondary: { main: '#80cbc4' },
          background: { default: '#121212', paper: '#1e1e1e' },
          text: { primary: '#ffffff', secondary: '#e0e0e0' }
        })
  }
});
