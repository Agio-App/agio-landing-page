import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'agio-theme';

const getInitialTheme = (): { theme: Theme; isManual: boolean } => {
  if (typeof window === 'undefined') {
    return { theme: 'light', isManual: false };
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return { theme: stored, isManual: true };
  }

  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return { theme: 'dark', isManual: false };
  }

  return { theme: 'light', isManual: false };
};

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const initialTheme = getInitialTheme();
  const [theme, setThemeState] = useState<Theme>(() => initialTheme.theme);
  const [isManual, setIsManual] = useState<boolean>(() => initialTheme.isManual);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    document.documentElement.setAttribute('data-theme', theme);
    if (isManual) {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } else {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    }
  }, [theme, isManual]);

  useEffect(() => {
    if (isManual || typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      setThemeState(event.matches ? 'dark' : 'light');
    };

    media.addEventListener?.('change', handleChange);
    if (!media.addEventListener && media.addListener) {
      media.addListener(handleChange);
    }

    return () => {
      media.removeEventListener?.('change', handleChange);
      if (!media.removeEventListener && media.removeListener) {
        media.removeListener(handleChange);
      }
    };
  }, [isManual]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (nextTheme: Theme) => {
        setIsManual(true);
        setThemeState(nextTheme);
      },
      toggleTheme: () => {
        setIsManual(true);
        setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
      },
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
