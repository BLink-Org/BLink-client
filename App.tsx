import {useEffect} from 'react';
import {NativeModules, Platform} from 'react-native';
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

const queryClient = new QueryClient();

export default function App(props: AppProps) {
  const restoreTheme = useThemeStore(state => state.restoreTheme);
  const {ShareMenu} = NativeModules;
  const isAuthenticated = useUserStore(state => state.isAuthenticated);
  const loadTokens = useUserStore(state => state.loadTokens);

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

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer key={isAuthenticated ? 'auth-true' : 'auth-false'}>
          <GlobalNavigation isAuthenticated={isAuthenticated} />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
