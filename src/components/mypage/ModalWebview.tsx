import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {CloseIcon} from '@/assets/icons/webview';
import {useThemeStore} from '@/store/useThemeStore';
import {FONTS} from '@/constants';

interface ModalWebViewProps {
  visible: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const ModalWebView = ({visible, onClose, url, title}: ModalWebViewProps) => {
  const {theme} = useThemeStore();
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}>
      <SafeAreaView
        style={[
          styles.container,
          {paddingTop: insets.top},
          {backgroundColor: theme.BACKGROUND},
        ]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButtonContainer}>
            <CloseIcon fill={theme.TEXT900} />
          </TouchableOpacity>
          <Text style={[styles.title, {color: theme.TEXT800}]}>{t(title)}</Text>

          <View style={styles.spacer}></View>
        </View>
        <WebView source={{uri: url}} style={styles.webView} />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    height: 56,
  },
  closeButtonContainer: {
    width: 26,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    ...FONTS.BODY1_MEDIUM,
  },
  spacer: {
    width: 26,
  },
});

export default ModalWebView;
