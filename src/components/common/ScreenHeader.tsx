import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {LogoImage} from '@/assets/icons/common';
import {SidebarIcon} from '@/assets/icons/home';

interface ScreenHeaderProps {
  toggleSideBar: () => void;
}

const ScreenHeader = ({toggleSideBar}: ScreenHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <SidebarIcon onPress={toggleSideBar} />
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
    paddingHorizontal: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightSpace: {
    width: 28,
  },
});
