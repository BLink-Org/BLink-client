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
} from '@/assets/icons/webview';
import {FONTS} from '@/constants';
import {extractHostname} from '@/utils/url-utils';
import NavigationButton from '@/components/webview/NavigationButton';
import type {WebViewNavigation} from 'react-native-webview';

const webViews: string[] = [
  'https://www.naver.com',
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
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCurrentUrl(navState.url);
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
  };

  const goBackPage = () => {
    navigation.goBack();
  };

  // 하나의 웹 뷰 내에서 뒤로가기, 앞으로가기, 새로고침
  const directBack = () => {
    webViewRef.current?.goBack();
  };

  const directFront = () => {
    webViewRef.current?.goForward();
  };

  const reloadPage = () => {
    webViewRef.current?.reload();
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCanGoBack(false);
      setCanGoForward(false);
    }
  };

  const goForward = () => {
    if (currentIndex < webViews.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCanGoBack(false);
      setCanGoForward(false);
    }
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
      <View>
        <View style={styles.backForwardButton}>
          <NavigationButton
            onPress={() => goBack()}
            disabled={currentIndex === 0}
            label="이전"
          />
          <NavigationButton
            onPress={() => goForward()}
            disabled={currentIndex === webViews.length - 1}
            label="다음"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={directBack} disabled={!canGoBack}>
            {canGoBack ? (
              <ContentBackIcon fill="black" />
            ) : (
              <ContentBackIcon fill="lightgray" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={directFront} disabled={!canGoForward}>
            {canGoForward ? (
              <ContentFrontIcon fill="black" />
            ) : (
              <ContentFrontIcon fill="lightgray" />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={shareUrl}>
            <ShareIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal}>
            <SaveIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={saveBookmark}>
            <BookmarkSelectedIcon />
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
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 4,
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
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 18,
    alignItems: 'center',
    gap: 16,
  },
});

export default WebViewList;
