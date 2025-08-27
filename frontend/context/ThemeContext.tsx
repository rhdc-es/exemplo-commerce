'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

type ThemeMode = 'light' | 'dark';
type ThemeSetting = ThemeMode | 'system';

interface ThemeContextValue {
  mode: ThemeMode;
  theme: ThemeSetting;
  setMode: (mode: ThemeSetting) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  theme: 'light',
  setMode: () => {}
});

const getSystemMode = (): ThemeMode =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeSetting>(
    (typeof window !== 'undefined' &&
      (localStorage.getItem('theme') as ThemeSetting)) ||
      'system'
  );

  const [mode, setModeState] = useState<ThemeMode>(() =>
    typeof window !== 'undefined' ? getSystemMode() : 'light'
  );

  useEffect(() => {
    if (theme === 'system') {
      setModeState(getSystemMode());
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => {
        setModeState(e.matches ? 'dark' : 'light');
      };
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    } else {
      setModeState(theme);
    }
  }, [theme]);

  const setMode = (newMode: ThemeSetting) => {
    setTheme(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newMode);
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, theme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
