import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {LogoImage} from '@/assets/icons/common';
import {SidebarIcon} from '@/assets/icons/home';

const ScreenHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <SidebarIcon />
      </TouchableOpacity>
      <LogoImage />
      <View style={styles.rightSpace} />
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightSpace: {
    width: 28,
  },
});
