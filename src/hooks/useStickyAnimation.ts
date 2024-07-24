import {useEffect, useRef} from 'react';
import {
  Animated,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

// 스크롤을 활성화/비활성화하는 prop 추가
const useStickyAnimation = (refreshing: boolean) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (refreshing) {
      scrollY.setValue(0);
    }
  }, [refreshing]);

  const clampedScrollY = Animated.diffClamp(scrollY, 0, 60);
  const translateY = clampedScrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60],
    extrapolate: 'clamp',
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (refreshing) {
      return;
    }

    const currentScrollY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const viewHeight = event.nativeEvent.layoutMeasurement.height;
    if (currentScrollY >= 0 && currentScrollY <= contentHeight - viewHeight) {
      scrollY.setValue(currentScrollY);
    }
  };

  return {translateY, handleScroll};
};

export default useStickyAnimation;
