import React, {useEffect} from 'react';
import {NativeModules, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GlobalNavigation from '@/components/navigation/GlobalNavigation';
import {useThemeStore} from '@/store/useThemeStore';

interface AppProps {
  sharedText: string;
}

export default function App(props: AppProps) {
  const restoreTheme = useThemeStore(state => state.restoreTheme);
  const {ShareMenu} = NativeModules;

  useEffect(() => {
    restoreTheme();

    // To verify shared text data within the app
    Platform.OS === 'ios'
      ? console.log('share extension text:', props.sharedText)
      : ShareMenu.getSharedText((sharedData: string) => {
          sharedData && console.log('Received shared data:', sharedData);
        });
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <GlobalNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
