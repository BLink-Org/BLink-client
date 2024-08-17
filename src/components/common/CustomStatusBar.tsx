import React from 'react';
import {StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useThemeStore} from '@/store/useThemeStore';

const CustomStatusBar = () => {
  const {theme} = useThemeStore();

  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        height: insets.top,
        marginTop: -insets.top,
        backgroundColor:
          theme.THEME_NUMBER === 3 ? theme.MAIN200 : theme.BACKGROUND,
      }}>
      <StatusBar
        barStyle={theme.THEME_NUMBER === 2 ? 'light-content' : 'dark-content'}
        backgroundColor={
          theme.THEME_NUMBER === 3 ? theme.MAIN200 : theme.BACKGROUND
        }
      />
    </View>
  );
};

export default CustomStatusBar;
