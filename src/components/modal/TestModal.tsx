import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Modal from 'react-native-modal';

interface TestModalProps {
  visible: boolean;
  onClose: () => void;
  currentUrl?: string;
}

const TestModal = ({visible, onClose, currentUrl}: TestModalProps) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver={true}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>현재 URL: {currentUrl}</Text>
        <Text style={styles.modalText}>저장되었습니다!</Text>
        <Button title="닫기" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 12,
  },
});

export default TestModal;
