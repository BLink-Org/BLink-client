import {useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet, Text} from 'react-native';
import {FONTS} from '@/constants';

interface ToastProps {
  text: string;
  marginBottom: number;
  isToastVisible: boolean;
  setIsToastVisible: (v: boolean) => void;
}
const screenWidth = Dimensions.get('window').width;
const toastWidth = screenWidth - 36;

const Toast = ({
  text,
  marginBottom,
  isToastVisible,
  setIsToastVisible,
}: ToastProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isToastVisible) {
      setIsToastVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const fadeOutTimer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setIsToastVisible(false);
        });
      }, 3000);

      return () => clearTimeout(fadeOutTimer);
    } else {
      fadeAnim.setValue(0);
    }
  }, [isToastVisible, fadeAnim]);

  if (!isToastVisible) {
    return null;
  }
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          bottom: marginBottom,
          left: (screenWidth - toastWidth) / 2,
        },
      ]}>
      <Text style={[FONTS.BODY1_MEDIUM, {color: 'white'}]}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: toastWidth,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#333D4B',
    zIndex: 99999999,
  },
});

export default Toast;
