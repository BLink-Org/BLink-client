import {useEffect, useState} from 'react';
import {Linking, DeviceEventEmitter} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as RNLocalize from 'react-native-localize';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as amplitude from '@amplitude/analytics-react-native';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import GlobalNavigation from '@/components/navigation/GlobalNavigation';
import {useThemeStore} from '@/store/useThemeStore';
import i18n from '@/i18n/i18n';
import {useUserStore} from '@/store/useUserStore';
import {trackEvent} from '@/utils/amplitude-utils';
import {AMPLITUDE_API_KEY} from '@env';
import GlobalNavigationUnauthenticated from '@/components/navigation/GlobalNavigationUnauthenticated';

interface AppProps {
  sharedURL: string;
}

const queryClient = new QueryClient();

export default function App(props: AppProps) {
  const restoreTheme = useThemeStore(state => state.restoreTheme);
  const isAuthenticated = useUserStore(state => state.isAuthenticated);
  console.log(
    '🚀 ~ file: App.tsx:26 ~ App ~ isAuthenticated:',
    isAuthenticated,
  );
  const loadTokens = useUserStore(state => state.loadTokens);

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  // [iOS & Android] 앱 첫 실행 시 props로 sharedURL 전달
  const [sharedURL, setSharedURL] = useState<string>(props.sharedURL || '');

  // sharedURL 변경 시 바텀 시트 노출
  useEffect(() => {
    if (sharedURL) {
      setIsBottomSheetVisible(true);
    }
  }, [sharedURL]);

  // [Android] 앱 포그라운드 전환 시 sharedURL 저장
  useEffect(() => {
    // URL 공유 이벤트 리스닝
    const urlListener = DeviceEventEmitter.addListener(
      'UrlShared',
      (url: string) => {
        setSharedURL(url);
      },
    );

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      urlListener.remove();
    };
  }, []);

  // [iOS] 앱 포그라운드 전환 시 sharedURL 저장
  useEffect(() => {
    if (props.sharedURL) {
      setSharedURL(props.sharedURL);
    }
    const handleDeepLink = (event: {url: string}) => {
      const url = event.url;
      if (url) {
        setSharedURL(url.split('sharedURL=')[1]);
      }
    };

    const linkingListener = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({url});
    });

    return () => {
      linkingListener.remove();
    };
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 테마 복원
        restoreTheme();

        // 언어 설정 -> 시스템 언어로 변경
        const locale = RNLocalize.getLocales()[0].languageCode;
        if (locale === 'ko') {
          i18n.changeLanguage(locale);
        } else {
          i18n.changeLanguage('en'); // 기본 언어 -> 영어
        }

        // 토큰 로드
        await loadTokens();

        // amplitude 초기화
        amplitude.init(AMPLITUDE_API_KEY);

        // 이벤트 추적
        trackEvent('App Opened');
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        // 모든 초기화 작업 완료 후 스플래시 화면 숨기기
        LottieSplashScreen.hide();
      }
    };

    initializeApp(); // 초기화 함수 호출
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer key={isAuthenticated ? 'auth-true' : 'auth-false'}>
          {isAuthenticated ? (
            <GlobalNavigation
              sharedURL={sharedURL}
              setSharedURL={setSharedURL}
              isBottomSheetVisible={isBottomSheetVisible}
              setIsBottomSheetVisible={setIsBottomSheetVisible}
            />
          ) : (
            <GlobalNavigationUnauthenticated />
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
