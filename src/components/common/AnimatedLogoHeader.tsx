import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import ScreenHeader from '@/components/home/ScreenHeader';

interface AnimatedHeaderProps {
  translateY: Animated.AnimatedInterpolation<number>;
  toggleSideBar: () => void;
  backgroundThemeColor: string;
  isBookmark?: boolean;
}

const AnimatedLogoHeader = ({
  translateY,
  toggleSideBar,
  backgroundThemeColor,
  isBookmark,
}: AnimatedHeaderProps) => (
  <Animated.View
    style={[
      styles.header,
      {backgroundColor: backgroundThemeColor},
      {
        transform: [{translateY}],
      },
    ]}>
    <ScreenHeader toggleSideBar={toggleSideBar} isBookmark={isBookmark} />
  </Animated.View>
);

export default AnimatedLogoHeader;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
