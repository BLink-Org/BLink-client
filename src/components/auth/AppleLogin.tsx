import {useState} from 'react';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {jwtDecode} from 'jwt-decode';
import * as amplitude from '@amplitude/analytics-react-native';
import {AMPLITUDE_API_KEY} from '@env';
import {AppleLogoIcon} from '@/assets/icons/onboarding';
import {FONTS} from '@/constants';
import {useAppleLogin} from '@/api/hooks/useAuth';
import {type TokensSchema} from '@/types';
import {useUserStore} from '@/store/useUserStore';
import {trackEvent} from '@/utils/amplitude-utils';

const AppleLogin = () => {
  const {setTokens} = useUserStore();
  const [userEmail, setUserEmail] = useState<string>('');

  const {mutate: appleLoginMutation} = useAppleLogin({
    onSuccess: async (data: TokensSchema) => {
      const {accessToken, refreshToken} = data;
      await setTokens(accessToken, refreshToken);
      amplitude.init(AMPLITUDE_API_KEY, userEmail);
      trackEvent('Login Success', {method: 'Apple'});
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
          appleLoginMutation({email: userInfo.email, identityToken});
        }
      }
    } catch (error: any) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.log('Apple Login -> User canceled Apple Sign in');
      } else {
        console.error('Apple Login -> Error:', error);
      }
    }
  };

  const handleLoginPress = () => {
    handleSignInApple().catch(error => console.error(error));
  };

  // iOS에서만 Apple 로그인 버튼을 렌더링
  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <TouchableOpacity onPress={handleLoginPress}>
      <View style={styles.logo}>
        <AppleLogoIcon />
        <Text style={styles.logoText}>Apple로 시작하기</Text>
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
  logoText: {
    color: '#fff',
    ...FONTS.BODY1_SEMIBOLD,
  },
});
