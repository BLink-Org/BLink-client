import {Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {useModalStore} from '@/store/useModalStore';
import {useThemeStore} from '@/store/useThemeStore';
import {FONTS} from '@/constants';

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
        <View
          style={[styles.textContainer, {backgroundColor: theme.BACKGROUND}]}>
          <Text style={[FONTS.BODY1_SEMIBOLD, {color: theme.TEXT900}]}>
            {headerText}
          </Text>
          <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT600}]}>
            {bodyText}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => closeModal(modalId)}
            style={[styles.button, {backgroundColor: theme.TEXT500}]}>
            <Text style={[FONTS.BODY1_SEMIBOLD, {color: theme.BACKGROUND}]}>
              {leftText}
            </Text>
          </Pressable>
          <Pressable
            onPress={rightOnPress}
            style={[styles.button, {backgroundColor: theme.MAIN400}]}>
            <Text style={[FONTS.BODY1_SEMIBOLD, {color: theme.BACKGROUND}]}>
              {rightText}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
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
});
