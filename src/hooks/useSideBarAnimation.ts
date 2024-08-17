import {useMemo, useRef} from 'react';
import {Animated, Dimensions, PanResponder} from 'react-native';

const useSideBarAnimation = (
  setIsSideBarVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const animation = useRef(
    new Animated.Value(-Dimensions.get('window').width),
  ).current;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          return Math.abs(gestureState.dx) > 5; // 좌우로 움직임이 있을 때만 제스처를 활성화
        },
        onMoveShouldSetPanResponderCapture: () => false,
        onPanResponderMove: (evt, gestureState) => {
          const newX = Math.max(
            -Dimensions.get('window').width,
            Math.min(0, gestureState.dx),
          );
          animation.setValue(newX);
        },
        onPanResponderRelease: (evt, gestureState) => {
          const {dx} = gestureState;
          const screenWidth = Dimensions.get('window').width;

          if (dx > screenWidth / 4) {
            Animated.timing(animation, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              setIsSideBarVisible(true);
            });
          } else if (dx < -screenWidth / 4) {
            Animated.timing(animation, {
              toValue: -screenWidth,
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              setIsSideBarVisible(false);
            });
          } else {
            Animated.timing(animation, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    [animation, setIsSideBarVisible],
  );

  return {animation, panResponder};
};

export default useSideBarAnimation;
