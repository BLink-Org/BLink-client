import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GlobalNavigation from '@/components/navigation/GlobalNavigation';
import {useThemeStore} from '@/store/useThemeStore';

export default function App() {
  const restoreTheme = useThemeStore(state => state.restoreTheme);

  useEffect(() => {
    restoreTheme();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <GlobalNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
