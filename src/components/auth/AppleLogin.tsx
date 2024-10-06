import {useState} from 'react';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {jwtDecode} from 'jwt-decode';
import * as amplitude from '@amplitude/analytics-react-native';
import * as RNLocalize from 'react-native-localize';
import {AMPLITUDE_API_KEY} from '@env';
import {FONTS} from '@/constants';
import {useAppleLogin} from '@/api/hooks/useAuth';
import {type TokensSchema} from '@/types';
import {useUserStore} from '@/store/useUserStore';
import {trackEvent} from '@/utils/amplitude-utils';

const AppleLogin = () => {
  const {setTokens} = useUserStore();
  const [userEmail, setUserEmail] = useState<string>('');

  const locale = RNLocalize.getLocales()[0].languageCode === 'ko' ? 'KO' : 'EN';

  const {mutate: appleLoginMutation} = useAppleLogin({
    onSuccess: async (data: TokensSchema) => {
      const {accessToken, refreshToken} = data;
      await setTokens(accessToken, refreshToken);
      amplitude.init(AMPLITUDE_API_KEY, userEmail);
      trackEvent('SignUp_Complete', {method: 'Apple'});
    },
  });

  const handleSignInApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      // 사용자에 대한 현재 인증 상태
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // 사용자가 인증되었다면,
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // identityToken 반환
        const identityToken = appleAuthRequestResponse.identityToken;

        if (identityToken) {
          const userInfo: {email: string} = jwtDecode(identityToken);
          setUserEmail(userInfo.email);
          appleLoginMutation({
            language: locale,
            email: userInfo.email,
            identityToken,
          });
        }
      }
    } catch (error: any) {
      if (error.code === appleAuth.Error.CANCELED) {
        trackEvent('SignUp_Quit', {method: 'Apple'});
      } else {
        console.warn('Apple Login -> Error:', error);
      }
    }
  };

  const handleLoginPress = () => {
    handleSignInApple().catch(error => console.warn(error));
  };

  // iOS에서만 Apple 로그인 버튼을 렌더링
  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <TouchableOpacity onPress={handleLoginPress}>
      <View style={styles.logo}>
        {locale === 'KO' ? (
          <Image
            source={require('@/assets/images/img-apple-ko.png')}
            style={styles.logoImage}
          />
        ) : (
          <Image
            source={require('@/assets/images/img-apple-en.png')}
            style={styles.logoImageEn}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AppleLogin;

const styles = StyleSheet.create({
  logo: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    height: 54,
    borderRadius: 100,
  },
  logoImage: {
    width: 168,
    height: 23,
  },
  logoImageEn: {
    width: 180,
    height: 23,
  },
  logoText: {
    color: '#fff',
    ...FONTS.BODY1_SEMIBOLD,
  },
});
