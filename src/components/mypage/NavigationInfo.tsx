import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ArrowForwardIcon} from '@/assets/icons/mypage';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';

const NavigationInfo = ({title}: {title: string}) => {
  const {theme} = useThemeStore();
  return (
    <View style={styles.container}>
      <Text style={[FONTS.BODY1_MEDIUM, {color: theme.TEXT800}]}>{title}</Text>
      <ArrowForwardIcon />
    </View>
  );
};

export default NavigationInfo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
