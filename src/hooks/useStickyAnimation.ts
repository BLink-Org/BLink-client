import {useRef} from 'react';
import {
  Animated,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

const useStickyAnimation = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const clampedScrollY = Animated.diffClamp(scrollY, 0, 60);
  const translateY = clampedScrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60],
    extrapolate: 'clamp',
  });

  const opacity = clampedScrollY.interpolate({
    inputRange: [0, 30],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // bounce 방지
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const viewHeight = event.nativeEvent.layoutMeasurement.height;
    if (currentScrollY >= 0 && currentScrollY <= contentHeight - viewHeight) {
      scrollY.setValue(currentScrollY);
    }
  };

  return {translateY, opacity, handleScroll};
};

export default useStickyAnimation;
