'use client';

import { IconButton } from '@mui/material';
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeContext();
  return (
    <IconButton color="inherit" onClick={toggleTheme}>
      {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
}
