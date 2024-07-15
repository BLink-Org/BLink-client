import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FONTS} from '@/constants';
import ThemeBackground from '@/components/common/ThemeBackground';
import ScreenHeader from '@/components/common/ScreenHeader';

const Home = () => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <ScreenHeader />
      <Text style={styles.boldText}>{t('안녕')}</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  boldText: {
    ...FONTS.SUBTITLE,
  },
});
