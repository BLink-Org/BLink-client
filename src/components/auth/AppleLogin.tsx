import {appleAuth} from '@invertase/react-native-apple-authentication';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {jwtDecode} from 'jwt-decode';
import {AppleLogoIcon} from '@/assets/icons/onboarding';
import {FONTS} from '@/constants';

const AppleLogin = () => {
  const handleSignInApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      console.log(
        '🚀 ~ file: AppleLogin.tsx:13 ~ handleSignInApple ~ appleAuthRequestResponse:',
        appleAuthRequestResponse,
      );
      const email = appleAuthRequestResponse.email; // 가상 이메일 주소
      console.log('User Email:', email);

      // 사용자에 대한 현재 인증 상태
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // 사용자가 인증되었다면,
      if (credentialState === appleAuth.State.AUTHORIZED) {
        console.log('Apple Login -> Authorized');

        // identityToken 반환
        const identityToken = appleAuthRequestResponse.identityToken;
        if (identityToken) {
          console.log('Apple Login -> Identity Token:', identityToken);
          console.log(
            'Apple Login -> decoded Identity Token:',
            jwtDecode(identityToken),
          );

          // TODO: 서버에 identityToken을 보내고 자체 발급 토큰을 요청 로직 추가
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
