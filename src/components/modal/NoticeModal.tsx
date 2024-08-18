import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {useThemeStore} from '@/store/useThemeStore'; // 테마 관련 스토어 사용
import {type ITheme} from '@/types'; // ITheme 타입 정의
import {FONTS} from '@/constants';

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onClick?: () => void;
}

const NoticeModal = ({
  isVisible,
  onClose,
  title,
  description,
  onClick,
}: CustomModalProps) => {
  const {theme} = useThemeStore();
  const styles = createStyles(theme);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropColor="rgba(0, 0, 0, 0.7)"
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      style={styles.modal}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onClick ?? onClose}>
        <Text style={styles.buttonText}>확인</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default NoticeModal;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    modal: {
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: theme.BACKGROUND,
      alignItems: 'center',
      justifyContent: 'center',
      width: 300,
      height: 163,
      paddingHorizontal: 40,
      paddingVertical: 40,
      gap: 8,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    title: {
      color: theme.TEXT900,
      ...FONTS.BODY1_SEMIBOLD,
    },
    description: {
      color: theme.TEXT600,
      ...FONTS.BODY2_REGULAR,
      textAlign: 'center',
    },
    button: {
      width: 300,
      height: 55,
      backgroundColor: theme.MAIN400,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomRightRadius: 12,
      borderBottomLeftRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: theme.BACKGROUND,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
