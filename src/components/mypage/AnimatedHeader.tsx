import React from 'react';
import {Animated, TouchableOpacity, StyleSheet} from 'react-native';
import {ArrowBackIcon} from '@/assets/icons/mypage';

interface AnimatedHeaderProps {
  translateY: Animated.AnimatedInterpolation<number>;
  handleGoBack: () => void;
  themeBackground: string;
  arrowColor: string;
  isThemeThree: boolean;
}

const AnimatedHeader = ({
  translateY,
  handleGoBack,
  themeBackground,
  arrowColor,
  isThemeThree,
}: AnimatedHeaderProps) => {
  return (
    <Animated.View
      style={[
        styles.header,
        {backgroundColor: isThemeThree ? '#EEF3FF' : themeBackground},
        {
          transform: [{translateY}],
        },
      ]}>
      <TouchableOpacity style={styles.headerIcon} onPress={handleGoBack}>
        <ArrowBackIcon fill={arrowColor} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AnimatedHeader;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerIcon: {
    paddingHorizontal: 18,
    height: 58,
    justifyContent: 'center',
  },
});
