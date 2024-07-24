import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Text, TouchableOpacity, Share} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import TestModal from '@/components/modal/TestModal';
import {
  ArrowBackIcon,
  RefreshIcon,
  SaveIcon,
  ShareIcon,
  BookmarkSelectedIcon,
  ContentBackIcon,
  ContentFrontIcon,
  // BookmarkUnselectedIcon,
} from '@/assets/icons/webview';
import {FONTS} from '@/constants';
import {extractHostname} from '@/utils/url-utils';
import type {WebViewNavigation} from 'react-native-webview';

const webViews: string[] = [
  'https://www.naver.com/',
  'https://www.google.com',
  'https://www.youtube.com',
  'https://www.gmail.com',
  'https://www.instagram.com',
];

const WebViewList = () => {
  const navigation = useNavigation();
  const webViewRef = useRef<WebView>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentUrl, setCurrentUrl] = useState<string>(webViews[currentIndex]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const goBackPage = () => {
    navigation.goBack();
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goForward = () => {
    if (currentIndex < webViews.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const reloadPage = () => {
    webViewRef.current?.reload();
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCurrentUrl(navState.url);
  };

  const openModal = () => {
    setModalVisible(true);
  };
  const saveBookmark = () => {
    // 북마크 저장
    console.log('북마크 저장');
  };

  const shareUrl = () => {
    Share.share({
      message: `Check out this website: ${currentUrl}`,
      url: currentUrl,
    }).catch(error => {
      console.error('Error sharing: ', error.message);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={goBackPage}>
          <ArrowBackIcon />
        </TouchableOpacity>
        <View style={styles.urlTextHolder}>
          <Text style={[FONTS.BODY2_REGULAR, {color: '#333D4B'}]}>
            {extractHostname(currentUrl)}
          </Text>
        </View>
        <TouchableOpacity onPress={reloadPage}>
          <RefreshIcon />
        </TouchableOpacity>
      </View>
      <WebView
        ref={webViewRef}
        source={{uri: webViews[currentIndex]}}
        style={styles.webView}
        onNavigationStateChange={handleNavigationStateChange}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={shareUrl}>
          <ShareIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={openModal}>
          <SaveIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={saveBookmark}>
          <BookmarkSelectedIcon />
        </TouchableOpacity>
        <View style={styles.backForwardButton}>
          <TouchableOpacity onPress={goBack} disabled={currentIndex === 0}>
            {currentIndex === 0 ? (
              <ContentBackIcon fill="lightgray" />
            ) : (
              <ContentBackIcon fill="black" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goForward}
            disabled={currentIndex === webViews.length - 1}>
            {currentIndex === webViews.length - 1 ? (
              <ContentFrontIcon fill="lightgray" />
            ) : (
              <ContentFrontIcon fill="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* 임시 저장모달  */}
      <TestModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        currentUrl={currentUrl}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  webView: {
    flex: 1,
  },
  buttonContainer: {
    height: 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 18,
    gap: 12,
    alignItems: 'center',
  },

  urlTextHolder: {
    flex: 1,
    height: 37,
    justifyContent: 'center',
    backgroundColor: '#ECF1F5',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  backForwardButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 8,
  },
});

export default WebViewList;
