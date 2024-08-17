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
  StatusBar,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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

  const insets = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight ?? 0;

  const [visible, setVisible] = useState(isBottomSheetVisible);
  const animation = useRef(
    new Animated.Value(Dimensions.get('window').height - statusBarHeight),
  ).current;

  useEffect(() => {
    if (isBottomSheetVisible) {
      setVisible(true);
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: Dimensions.get('window').height - statusBarHeight,
        duration: 300,
        useNativeDriver: true,
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
            height: Dimensions.get('window').height - statusBarHeight,
          },
        ]}>
        <View style={styles.header}>
          <View />
          <Text style={styles.modalTitle}>{modalTitle}</Text>
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
    modalTitle: {
      color: theme.TEXT900,
      ...FONTS.SUBTITLE,
    },
  });

export default BottomSheet;
