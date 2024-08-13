import React, {useMemo} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import {useThemeStore} from '@/store/useThemeStore';
import {type ITheme} from '@/types';

const CustomLoading = () => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </SafeAreaView>
  );
};

export default CustomLoading;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.BACKGROUND,
    },
  });
