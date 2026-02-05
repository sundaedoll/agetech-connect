import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const THEME_STORAGE_KEY = '@agetech_theme';

export type ThemePreference = 'light' | 'dark';

type ThemeContextValue = {
  colorScheme: ThemePreference | null;
  setColorScheme: (theme: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Returns theme preference when inside ThemeProvider, null otherwise */
export function useThemeOptional() {
  return useContext(ThemeContext);
}

/** Returns theme preference; throws when outside ThemeProvider */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorSchemeState] = useState<ThemePreference | null>(null);
  const userHasSetRef = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((stored) => {
      if (userHasSetRef.current) return; // User already toggled; don't overwrite
      if (stored === 'light' || stored === 'dark') {
        setColorSchemeState(stored);
      } else {
        setColorSchemeState(null); // null = use system default
      }
    });
  }, []);

  const setColorScheme = useCallback((theme: ThemePreference) => {
    userHasSetRef.current = true;
    setColorSchemeState(theme);
    AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
