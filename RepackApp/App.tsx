import './nativewind.css';

import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';
import { QueryProvider } from './src/providers/QueryProvider';
import { ThemeProvider } from './src/providers/ThemeProvider';
import { useThemeStore } from '@/stores/theme';
import { useTheme } from './src/hooks/useTheme';

import Button from '@/components/Button';

function App() {
  const { initializeTheme, isInitialized } = useThemeStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeTheme();
        setIsReady(true);
      } catch {
        setIsReady(true);
      }
    };
    init();
  }, [initializeTheme]);

  useEffect(() => {
    if (isReady) {
      RNBootSplash.hide({ fade: true });
    }
  }, [isReady]);

  if (!isInitialized || !isReady) {
    return null;
  }

  return (
    <QueryProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <AppContent />
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

function AppContent() {
  const { isDark, toggleTheme, colorScheme } = useTheme();

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
    <SafeAreaView
      className={`${isDark ? 'dark ' : ''} flex-1 bg-background text-primary`}
    >
      <View className={`${isDark ? 'dark ' : ''} flex-1 bg-background`}>
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-2xl font-bold mb-4 text-primary">
            NativeWind is configured! 🎉
          </Text>

          <Text className="text-base mb-4 text-primary">
            Theme: {isDark ? 'Dark' : 'Light'} ({colorScheme})
          </Text>

          <Button text="Toggle Theme" onPress={handleToggleTheme} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
