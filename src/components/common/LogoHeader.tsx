import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LogoImage} from '@/assets/icons/common';

// 추후 common Header에 통합하기
const LogoHeader = () => {
  return (
    <View style={styles.container}>
      <LogoImage />
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
