import {useEffect, useRef, useMemo} from 'react';
import {Animated, Dimensions, StyleSheet, Text} from 'react-native';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {type ITheme} from '@/types';

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
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
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
  }, [isToastVisible, fadeAnim, setIsToastVisible]);

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
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.TEXT700,
      position: 'absolute',
      width: toastWidth,
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: 4,
      zIndex: 9999,
    },
    text: {
      color: theme.BACKGROUND,
      ...FONTS.BODY1_MEDIUM,
    },
  });

export default Toast;
