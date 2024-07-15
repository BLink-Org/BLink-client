import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';

const Home = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>{t('안녕')}</Text>
      <Text style={styles.boldText}>{t('위치')}</Text>
      <Text style={styles.boldText}>{t('마이페이지')}</Text>
      <Text style={styles.boldText}>Bold Text</Text>
      <Text style={styles.regularText}>Regular Text</Text>
      <Text style={styles.mediumText}>Medium Text</Text>
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
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
  },
  regularText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Regular',
  },
  mediumText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Medium',
  },
});
