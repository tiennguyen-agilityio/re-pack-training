import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { useThemeStore } from '@/stores/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const { isDark, colorScheme } = useThemeStore();

  const actualIsDark =
    colorScheme === 'system' ? systemColorScheme === 'dark' : isDark;

  useEffect(() => {
    StatusBar.setBarStyle(actualIsDark ? 'light-content' : 'dark-content');
  }, [actualIsDark]);

  return <>{children}</>;
};
