'use client';

import { ReactNode, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from './theme';
import { ThemeContextProvider, useThemeContext } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const { mode } = useThemeContext();

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <ThemeWrapper>{children}</ThemeWrapper>
      </AuthProvider>
    </ThemeContextProvider>
  );
}
