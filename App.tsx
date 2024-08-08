import React, {useEffect} from 'react';
import {NativeModules, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as RNLocalize from 'react-native-localize';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import GlobalNavigation from '@/components/navigation/GlobalNavigation';
import {useThemeStore} from '@/store/useThemeStore';
import i18n from '@/i18n/i18n';

interface AppProps {
  sharedText: string;
}

const queryClient = new QueryClient();

export default function App(props: AppProps) {
  const restoreTheme = useThemeStore(state => state.restoreTheme);
  const {ShareMenu} = NativeModules;

  useEffect(() => {
    // 테마 변경
    restoreTheme();
    // 언어 변경 -> 시스템 언어로 변경
    const locale = RNLocalize.getLocales()[0].languageCode;
    i18n.changeLanguage(locale);

    // To verify shared text data within the app
    Platform.OS === 'ios'
      ? console.log('share extension text:', props.sharedText)
      : ShareMenu.getSharedText((sharedData: string) => {
          sharedData && console.log('Received shared data:', sharedData);
        });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <GlobalNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
