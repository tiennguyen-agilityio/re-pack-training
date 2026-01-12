import { useColorScheme } from 'react-native';

// Stores
import { useThemeStore } from '@/stores/theme';

export const useTheme = (): {
  isDark: boolean;
  colorScheme: 'light' | 'dark' | 'system';
  setColorScheme: (scheme: 'light' | 'dark' | 'system') => Promise<void>;
  toggleTheme: () => Promise<void>;
} => {
  const systemColorScheme = useColorScheme();
  const { isDark, colorScheme, setColorScheme, toggleTheme } = useThemeStore();

  const actualIsDark =
    colorScheme === 'system' ? systemColorScheme === 'dark' : isDark;

  return {
    isDark: actualIsDark,
    colorScheme,
    setColorScheme,
    toggleTheme,
  };
};
