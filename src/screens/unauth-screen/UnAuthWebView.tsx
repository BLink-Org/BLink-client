import React, {useState, useRef, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView, type WebViewNavigation} from 'react-native-webview';
import {useTranslation} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import {FONTS} from '@/constants';
import {extractHostname, shareUrl} from '@/utils/url-utils';
import {type RootStackNavigationProp, type ITheme} from '@/types';
import {useThemeStore} from '@/store/useThemeStore';
import NavigationButton from '@/components/common/NavigationButton';
import {
  ArrowBackIcon,
  RefreshIcon,
  SaveIcon,
  ShareIcon,
  ContentBackIcon,
  ContentFrontIcon,
} from '@/assets/icons/webview';
import {PinnedIcon} from '@/assets/icons/bottom-tab';
import DummyData from '@/constants/unauth-default-data.json';
import LoginModal from '@/components/modal/LoginModal';
import {trackEvent} from '@/utils/amplitude-utils';

const UnAuthWebView = () => {
  const webViewRef = useRef<WebView>(null);
  const {theme} = useThemeStore();
  const {t} = useTranslation();

  const styles = useMemo(() => createStyles(theme), [theme]);
  const locale = RNLocalize.getLocales()[0].languageCode === 'ko' ? 'KO' : 'EN';

  const currentUrl = locale === 'KO' ? DummyData[0].url : DummyData[1].url;

  const navigation = useNavigation<RootStackNavigationProp>();
  // 로그인 모달
  const [isNoticeModalVisible, setIsNoticeModalVisible] = useState(false);

  // 모달 닫은 후 로그인으로 이동
  const handleModalClose = () => {
    navigation.navigate('Onboarding');
    setIsNoticeModalVisible(false);
  };
  // 로그인 모달 열기
  const onPressLoginAlert = () => {
    setIsNoticeModalVisible(true);
  };

  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    // 뒤로가기, 앞으로가기 버튼 상태 업데이트
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
  };

  // 하나의 웹 뷰 내에서 뒤로가기, 앞으로가기, 새로고침
  const directBack = () => {
    webViewRef.current?.goBack();
  };

  const directFront = () => {
    webViewRef.current?.goForward();
  };

  // 전체 링크에서 이전 링크, 다음 링크로 이동
  const goBack = () => {};

  const goForward = async () => {};

  const handleGoForward = () => {
    goForward().catch(error => {
      console.error('Error navigating forward:', error);
    });
  };

  const reloadPage = () => {
    webViewRef.current?.reload();
  };

  const goBackPage = () => {
    navigation.goBack();
    trackEvent('Link_ViewPage_Closed', {Link_Viewed_Location: 'around'});
  };

  // 핀 토글
  const [isPinned, setIsPinned] = useState(false);
  const handlePinToggle = () => {
    setIsPinned(prevState => !prevState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={goBackPage}>
          <ArrowBackIcon fill={theme.TEXT900} />
        </TouchableOpacity>
        <View style={styles.urlTextHolder}>
          <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT700}]}>
            {extractHostname(currentUrl ?? '')}
          </Text>
        </View>
        <TouchableOpacity onPress={reloadPage}>
          <RefreshIcon fill={theme.TEXT900} />
        </TouchableOpacity>
      </View>

      {currentUrl && (
        <WebView
          ref={webViewRef}
          source={{uri: currentUrl}}
          style={styles.webViewContainer}
          onNavigationStateChange={handleNavigationStateChange}
        />
      )}
      <View style={styles.backForwardButton}>
        <NavigationButton
          onPress={goBack}
          disabled={true}
          label={t('이전 링크')}
        />
        <NavigationButton
          onPress={handleGoForward}
          disabled={true}
          label={t('다음 링크')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={directBack} disabled={!canGoBack}>
          <ContentBackIcon fill={canGoBack ? theme.TEXT700 : theme.TEXT300} />
        </TouchableOpacity>
        <TouchableOpacity onPress={directFront} disabled={!canGoForward}>
          <ContentFrontIcon
            fill={canGoForward ? theme.TEXT700 : theme.TEXT300}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => shareUrl(currentUrl ?? '')}>
          <View style={styles.shareIcon} />
          <ShareIcon width={26} height={26} fill={theme.TEXT900} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePinToggle}>
          <PinnedIcon
            width={30}
            height={30}
            strokeWidth={1.6}
            fill={isPinned ? theme.TEXT900 : 'transparent'}
            stroke={theme.TEXT900}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLoginAlert}>
          <SaveIcon fill={theme.TEXT900} />
        </TouchableOpacity>
      </View>
      <LoginModal
        isVisible={isNoticeModalVisible}
        onClose={() => setIsNoticeModalVisible(false)}
        onClick={handleModalClose}
      />
    </SafeAreaView>
  );
};

export default UnAuthWebView;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.BACKGROUND,
    },
    buttonContainer: {
      paddingTop: 8,
      paddingBottom: 4,
      paddingHorizontal: 4,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    webViewContainer: {
      flex: 1,
    },
    shareIcon: {
      paddingVertical: 2,
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
