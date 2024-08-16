import React, {useState, useRef, useEffect, useMemo} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView, type WebViewNavigation} from 'react-native-webview';
import {FONTS} from '@/constants';
import {extractHostname, shareUrl} from '@/utils/url-utils';
import {type ITheme} from '@/types';
import {useThemeStore} from '@/store/useThemeStore';
import {useLinks} from '@/api/hooks/useLink';
import NavigationButton from '@/components/webview/NavigationButton';
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

const WebViewList = () => {
  const navigation = useNavigation();
  const webViewRef = useRef<WebView>(null);
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const route = useRoute();
  const {folderId, sortBy, size, initialIndex} = route.params as {
    folderId: number | null;
    sortBy: string;
    size: number;
    initialIndex: number;
  };

  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);
  const [webViewKey, setWebViewKey] = useState<number>(0); // 웹뷰 리렌더링용 키

  const {
    data: linkData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLinks({
    folderId,
    size,
    sortBy,
  });

  const linkList = linkData?.pages.flatMap(page => page.linkDtos) ?? [];

  // 첫 URL 설정
  useEffect(() => {
    if (linkList.length > 0 && linkList[currentIndex]?.url) {
      setCurrentUrl(linkList[currentIndex]?.url);
    }
  }, [linkList, currentIndex]);

  // 뒤로가기, 앞으로가기 상태 업데이트
  const handleNavigationStateChange = (navState: WebViewNavigation) => {
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

  // 전체 링크에서 이전 링크, 다음링크로 이동
  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setWebViewKey(prevKey => prevKey + 1);
    }
  };

  const goForward = async () => {
    if (currentIndex < linkList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setWebViewKey(prevKey => prevKey + 1);
    } else if (hasNextPage) {
      const nextPageData = await fetchNextPage();
      if (nextPageData.data?.pages) {
        const newLinks = nextPageData.data.pages.flatMap(page => page.linkDtos);
        setCurrentIndex(currentIndex + 1);
        setCurrentUrl(newLinks[0]?.url ?? '');
        setWebViewKey(prevKey => prevKey + 1);
      }
    }
  };

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
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const saveBookmark = () => {
    console.log('북마크 저장');
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

      {/* currentUrl이 존재할 때만 WebView 렌더링 */}
      {currentUrl && (
        <WebView
          ref={webViewRef}
          key={webViewKey} // 키 변경 시 웹뷰 리렌더링
          source={{uri: currentUrl}}
          onNavigationStateChange={handleNavigationStateChange} // URL 리디렉션 감지
        />
      )}

      <View style={styles.backForwardButton}>
        <NavigationButton
          onPress={goBack}
          disabled={currentIndex === 0}
          label="이전 링크"
        />
        <NavigationButton
          onPress={handleGoForward}
          disabled={
            (!hasNextPage && currentIndex === linkList.length - 1) ||
            isFetchingNextPage
          }
          label={isFetchingNextPage ? '로딩 중...' : '다음 링크'}
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

        <TouchableOpacity onPress={() => shareUrl(currentUrl ?? '')}>
          <ShareIcon fill={theme.TEXT900} />
        </TouchableOpacity>
        <TouchableOpacity onPress={saveBookmark}>
          <PinnedUnselectedIcon stroke={theme.TEXT900} strokeWidth={1.5} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openModal}>
          <SaveIcon fill={theme.TEXT900} />
        </TouchableOpacity>
      </View>

      {/* 임시 저장모달 */}
      <TestModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        currentUrl={currentUrl ?? ''}
      />
    </SafeAreaView>
  );
};

export default WebViewList;

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
