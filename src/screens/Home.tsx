import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {FONTS} from '@/constants';

const Home = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>{t('안녕')}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  boldText: {
    ...FONTS.SUBTITLE,
  },
});
