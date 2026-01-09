import './nativewind.css';

import React, { useEffect } from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View className="flex-1 bg-green-500 justify-center items-center">
          <Text className="text-white text-2xl font-bold mb-4">
            NativeWind is configured! 🎉
          </Text>
          <Button title="Press me" onPress={() => console.log('Pressed')} />
        </View>
      </View>
      <View className="flex-1 bg-green-500 justify-center items-center">
        <Text className="text-red-500">Hello</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default App;
