import {type ReactNode, useEffect, useRef, useState, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Modal as RNModal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Platform,
  Easing,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {DeleteIcon} from '@/assets/icons/common';
import {type ITheme} from '@/types';

interface BottomSheetProps {
  modalTitle: string;
  children: ReactNode;
  isBottomSheetVisible: boolean;
  toggleBottomSheet: () => void;
}

const BottomSheet = ({
  modalTitle,
  children,
  isBottomSheetVisible,
  toggleBottomSheet,
}: BottomSheetProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {t} = useTranslation(); // 추가

  const insets = useSafeAreaInsets();
  const bottomSheetHeight = useMemo(() => {
    const statusBarHeight = Platform.OS === 'ios' ? insets.top : 0;
    return Dimensions.get('window').height - statusBarHeight;
  }, [Platform.OS]);

  const [visible, setVisible] = useState(isBottomSheetVisible);
  const animation = useRef(new Animated.Value(bottomSheetHeight)).current;

  useEffect(() => {
    if (isBottomSheetVisible) {
      setVisible(true);
      Animated.timing(animation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: bottomSheetHeight,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in(Easing.quad),
      }).start(() => setVisible(false));
    }
  }, [isBottomSheetVisible]);

  return (
    <RNModal
      visible={visible}
      onRequestClose={toggleBottomSheet}
      transparent
      animationType="none"
      statusBarTranslucent={true}
      hardwareAccelerated>
      <TouchableWithoutFeedback onPress={toggleBottomSheet}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{translateY: animation}],
            height: bottomSheetHeight,
          },
        ]}>
        <View style={styles.header}>
          <View style={styles.emptyBox} />
          <Text style={styles.modalTitle}>{t(modalTitle)}</Text>
          <TouchableOpacity onPress={toggleBottomSheet}>
            <DeleteIcon fill={theme.TEXT600} />
          </TouchableOpacity>
        </View>
        {children}
      </Animated.View>
    </RNModal>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
    },
    modalContainer: {
      backgroundColor: theme.BACKGROUND,
      borderTopRightRadius: 28,
      borderTopLeftRadius: 28,
      width: '100%',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: -15},
      shadowOpacity: 0.1,
      shadowRadius: 20,
      position: 'absolute',
      left: 0,
      bottom: 0,
      elevation: 5,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 18,
    },
    emptyBox: {
      width: 24,
    },
    modalTitle: {
      color: theme.TEXT900,
      ...FONTS.SUBTITLE,
    },
  });

export default BottomSheet;
