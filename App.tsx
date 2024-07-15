import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as RNLocalize from 'react-native-localize';
import GlobalNavigation from '@/components/navigation/GlobalNavigation';
import {useThemeStore} from '@/store/useThemeStore';
import i18n from '@/i18n/i18n';

export default function App() {
  const restoreTheme = useThemeStore(state => state.restoreTheme);

  useEffect(() => {
    // 테마 변경
    restoreTheme();
    // 언어 변경 -> 시스템 언어로 변경
    const locale = RNLocalize.getLocales()[0].languageCode;
    i18n.changeLanguage(locale);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <GlobalNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
