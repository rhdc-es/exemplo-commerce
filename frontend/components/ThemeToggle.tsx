'use client';

import { IconButton } from '@mui/material';
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import BrightnessAuto from '@mui/icons-material/BrightnessAuto';
import { useThemeContext } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, setMode } = useThemeContext();

  const cycleTheme = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setMode(next);
  };

  const icon =
    theme === 'light' ? <Brightness4 /> : theme === 'dark' ? <Brightness7 /> : <BrightnessAuto />;

  return (
    <IconButton color="inherit" onClick={cycleTheme}>
      {icon}
    </IconButton>
  );
}
