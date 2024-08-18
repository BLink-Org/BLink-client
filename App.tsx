import {useEffect, useState} from 'react';
import {NativeModules, Platform, Linking} from 'react-native';
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

interface AppProps {
  sharedText: string;
}

const getQueryParams = (url: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const queryString = url.split('?')[1]; // '?' 이후의 쿼리 문자열을 가져옵니다.
  if (queryString) {
    const pairs = queryString.split('&'); // '&'로 쿼리 문자열을 나눕니다.
    pairs.forEach(pair => {
      const [key, value] = pair.split('='); // '='로 각 쌍을 나눕니다.
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
  }
  return params;
};

const queryClient = new QueryClient();

export default function App(props: AppProps) {
  const restoreTheme = useThemeStore(state => state.restoreTheme);
  const {ShareMenu} = NativeModules;
  const isAuthenticated = useUserStore(state => state.isAuthenticated);
  console.log(
    '🚀 ~ file: App.tsx:26 ~ App ~ isAuthenticated:',
    isAuthenticated,
  );
  const loadTokens = useUserStore(state => state.loadTokens);

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  useEffect(() => {
    const handleDeepLink = (event: {url: any}) => {
      const url = event.url as string;
      if (url) {
        console.log('URL', decodeURI(url), props);
        // const queryParams = getQueryParams(url); // 쿼리 파라미터 파싱
        // const sharedURL = queryParams.sharedURL; // 'sharedURL' 값 가져오기
        // console.log(queryParams, sharedURL);
        // if (sharedURL) {
        setIsBottomSheetVisible(true);
        // }
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({url});
    });

    return () => {
      subscription.remove();
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

        // 공유 텍스트 데이터 처리
        if (Platform.OS === 'ios') {
          console.log('share extension text:', props.sharedText);
        } else {
          ShareMenu.getSharedText((sharedData: string) => {
            if (sharedData) {
              console.log('Received shared data:', sharedData);
            }
          });
        }
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
          <GlobalNavigation
            isBottomSheetVisible={isBottomSheetVisible}
            setIsBottomSheetVisible={setIsBottomSheetVisible}
            isAuthenticated={isAuthenticated}
          />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
