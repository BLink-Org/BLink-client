import React, {useState, useRef, useEffect, useMemo} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView, type WebViewNavigation} from 'react-native-webview';
import {FONTS} from '@/constants';
import {extractHostname} from '@/utils/url-utils'; // URL 도메인 추출 함수
import {type ITheme} from '@/types';
import {useThemeStore} from '@/store/useThemeStore';
import {useLinks} from '@/api/hooks/useLink';
import NavigationButton from '@/components/webview/NavigationButton';

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
  const [currentUrl, setCurrentUrl] = useState<string | null>(null); // 초기 값 null 처리
  const [lastUrl, setLastUrl] = useState<string>(''); // 마지막 URL을 추적하기 위한 상태

  const {
    data: linkData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useLinks({
    folderId,
    size,
    sortBy,
  });

  const linkList = linkData?.pages.flatMap(page => page.linkDtos) ?? [];

  // 로딩 중이거나 링크 목록이 없을 때 null을 반환
  if (isLoading || linkList.length === 0) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // 첫 URL을 설정
  useEffect(() => {
    if (linkList.length > 0 && linkList[currentIndex]?.url) {
      setCurrentUrl(linkList[currentIndex]?.url); // 링크가 존재할 때만 설정
    }
  }, [linkList, currentIndex]);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    const newUrl: string | null = navState.url; // navState.url은 string | null 타입
    if (!newUrl) return; // newUrl이 없으면 처리하지 않음

    const originalDomain = extractHostname(currentUrl ?? '');
    const newDomain = extractHostname(newUrl);

    // 동일 도메인 또는 m. 도메인 처리
    if (originalDomain === newDomain || newDomain.startsWith('m.')) {
      return; // 리디렉션 URL이 동일한 도메인일 경우 상태 업데이트를 하지 않음
    }

    // 새로운 URL이 기존 URL과 다를 때만 상태 업데이트
    if (newUrl !== lastUrl) {
      setCurrentUrl(newUrl);
      setLastUrl(newUrl);
    }
  };

  const goBackPage = () => {
    navigation.goBack();
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goForward = async () => {
    if (currentIndex < linkList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (hasNextPage) {
      const nextPageData = await fetchNextPage();
      if (nextPageData.data?.pages) {
        const newLinks = nextPageData.data.pages.flatMap(page => page.linkDtos);
        setCurrentIndex(currentIndex + 1);
        setCurrentUrl(newLinks[0]?.url ?? '');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={goBackPage}>
          <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT700}]}>
            Back
          </Text>
        </TouchableOpacity>
        <View style={styles.urlTextHolder}>
          <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT700}]}>
            {extractHostname(currentUrl ?? '')}
          </Text>
        </View>
      </View>

      {/* currentUrl이 존재할 때만 WebView 렌더링 */}
      {currentUrl && (
        <WebView
          ref={webViewRef}
          source={{uri: currentUrl}}
          onNavigationStateChange={handleNavigationStateChange} // URL 리디렉션 감지
        />
      )}

      <View style={styles.buttonContainer}>
        <NavigationButton
          onPress={goBack}
          disabled={currentIndex === 0}
          label="이전 링크"
        />
        <NavigationButton
          onPress={goForward}
          disabled={!hasNextPage && currentIndex === linkList.length - 1}
          label={isFetchingNextPage ? '로딩 중...' : '다음 링크'}
        />
      </View>
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
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
    navigationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    urlTextHolder: {
      flex: 1,
      alignItems: 'center',
    },
  });
