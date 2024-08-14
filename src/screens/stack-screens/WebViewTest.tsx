import React, {useState, useRef, useMemo} from 'react';
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
  ContentBackIcon,
  ContentFrontIcon,
  PinnedUnselectedIcon,
} from '@/assets/icons/webview';
import {FONTS} from '@/constants';
import {extractHostname} from '@/utils/url-utils';
import NavigationButton from '@/components/webview/NavigationButton';
import {type ITheme} from '@/types';
import {useThemeStore} from '@/store/useThemeStore';
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
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentUrl, setCurrentUrl] = useState<string>(webViews[currentIndex]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);
  const [webViewKey, setWebViewKey] = useState<number>(0);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCurrentUrl(navState.url);
    console.log('navState', navState);
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
      setWebViewKey(prevKey => prevKey + 1);
    }
  };

  const goForward = () => {
    if (currentIndex < webViews.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setWebViewKey(prevKey => prevKey + 1);
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
          <ArrowBackIcon fill={theme.TEXT900} />
        </TouchableOpacity>
        <View style={styles.urlTextHolder}>
          <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT700}]}>
            {extractHostname(currentUrl)}
          </Text>
        </View>
        <TouchableOpacity onPress={reloadPage}>
          <RefreshIcon fill={theme.TEXT900} />
        </TouchableOpacity>
      </View>
      <WebView
        ref={webViewRef}
        key={webViewKey}
        source={{uri: webViews[currentIndex]}}
        style={styles.webView}
        onNavigationStateChange={handleNavigationStateChange}
      />
      <View>
        <View style={styles.backForwardButton}>
          <NavigationButton
            onPress={() => goBack()}
            disabled={currentIndex === 0}
            label="이전 링크"
          />
          <NavigationButton
            onPress={() => goForward()}
            disabled={currentIndex === webViews.length - 1}
            label="다음 링크"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={directBack} disabled={!canGoBack}>
            {canGoBack ? (
              <ContentBackIcon fill={theme.TEXT700} />
            ) : (
              <ContentBackIcon fill={theme.TEXT300} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={directFront} disabled={!canGoForward}>
            {canGoForward ? (
              <ContentFrontIcon fill={theme.TEXT700} />
            ) : (
              <ContentFrontIcon fill={theme.TEXT300} />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={shareUrl}>
            <ShareIcon fill={theme.TEXT900} />
          </TouchableOpacity>
          <TouchableOpacity onPress={saveBookmark}>
            <PinnedUnselectedIcon stroke={theme.TEXT900} strokeWidth={1.5} />
            {/* <PinnedSelectedIcon fill={theme.TEXT900} stroke={theme.TEXT900} /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal}>
            <SaveIcon fill={theme.TEXT900} />
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

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.BACKGROUND,
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
      paddingVertical: 8,
      paddingHorizontal: 18,
      gap: 12,
      alignItems: 'center',
    },
    urlTextHolder: {
      flex: 1,
      height: 37,
      justifyContent: 'center',
      backgroundColor: theme.TEXT200,
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
