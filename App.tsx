import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GlobalNavigation from '@/components/navigation/GlobalNavigation';
import {useThemeStore} from '@/store/useThemeStore';

interface AppProps {
  sharedText: string;
}

export default function App(props: AppProps) {
  const restoreTheme = useThemeStore(state => state.restoreTheme);

  useEffect(() => {
    restoreTheme();
    console.log(props.sharedText);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <GlobalNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
