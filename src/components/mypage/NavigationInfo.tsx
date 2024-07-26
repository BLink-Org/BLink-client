import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ArrowForwardIcon} from '@/assets/icons/mypage';
import {FONTS} from '@/constants';

interface NavigationInfoProps {
  title: string;
  themeColor: string;
}

const NavigationInfo = ({title, themeColor}: NavigationInfoProps) => {
  return (
    <View style={styles.container}>
      <Text style={[FONTS.BODY1_MEDIUM, {color: themeColor}]}>{title}</Text>
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
