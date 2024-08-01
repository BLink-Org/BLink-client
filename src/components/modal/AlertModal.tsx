import {useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {useModalStore} from '@/store/useModalStore';
import {useThemeStore} from '@/store/useThemeStore';
import {FONTS} from '@/constants';
import {type ITheme} from '@/types';

interface AlertModalProps {
  modalId: string; // 모달 식별 ID
  headerText: string;
  bodyText: string;
  leftText: string;
  rightText: string;
  rightOnPress: () => void;
}

const AlertModal = ({
  modalId,
  headerText,
  bodyText,
  leftText,
  rightText,
  rightOnPress,
}: AlertModalProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {modals, closeModal} = useModalStore();

  return (
    <Modal
      isVisible={modals === modalId}
      onBackdropPress={() => closeModal(modalId)}
      backdropColor="rgba(0, 0, 0, 0.6)"
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver={true}
      style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>{headerText}</Text>
          <Text style={styles.bodyText}>{bodyText}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => closeModal(modalId)}
            style={styles.leftButton}>
            <Text style={styles.buttonText}>{leftText}</Text>
          </Pressable>
          <Pressable onPress={rightOnPress} style={styles.rightButton}>
            <Text style={styles.buttonText}>{rightText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: 300,
      borderRadius: 12,
      overflow: 'hidden',
    },
    textContainer: {
      paddingVertical: 40,
      paddingHorizontal: 20,
      gap: 8,
      textAlign: 'center',
      alignItems: 'center',
      backgroundColor: theme.BACKGROUND,
    },
    headerText: {
      color: theme.TEXT900,
      ...FONTS.BODY1_SEMIBOLD,
    },
    bodyText: {
      color: theme.TEXT600,
      ...FONTS.BODY2_REGULAR,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 14,
    },
    leftButton: {
      backgroundColor: theme.TEXT500,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 14,
    },
    rightButton: {
      backgroundColor: theme.MAIN400,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 14,
    },
    buttonText: {
      color: theme.BACKGROUND,
      ...FONTS.BODY1_SEMIBOLD,
    },
  });
