import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {useThemeStore} from '@/store/useThemeStore'; // 테마 관련 스토어 사용
import {type ITheme} from '@/types'; // ITheme 타입 정의
import {FONTS} from '@/constants';

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  onClick: () => void;
}

const LoginModal = ({isVisible, onClose, onClick}: CustomModalProps) => {
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
        <Text style={styles.title}>로그인이 필요해요</Text>
        <Text style={styles.description}>
          해당 기능을 사용하려면 로그인 해주세요
        </Text>
      </View>
      <View style={[styles.buttonContainer]}>
        <Pressable
          style={[styles.button, {backgroundColor: theme.TEXT500}]}
          onPress={onClose}>
          <Text style={styles.buttonText}>다음에</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onClick}>
          <Text style={styles.buttonText}>로그인</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default LoginModal;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    modal: {
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: theme.BACKGROUND,
      alignItems: 'center',
      justifyContent: 'center',
      width: 320,
      height: 163,
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomRightRadius: 12,
      borderBottomLeftRadius: 12,
      overflow: 'hidden',
    },

    button: {
      width: 160,
      height: 55,
      backgroundColor: theme.MAIN400,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: theme.BACKGROUND,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
