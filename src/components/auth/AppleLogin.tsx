import {appleAuth} from '@invertase/react-native-apple-authentication';
import {Button, Platform, View} from 'react-native';

const AppleLogin = () => {
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
        console.log('Apple Login -> Authorized');

        // identityToken 반환
        const identityToken = appleAuthRequestResponse.identityToken;
        if (identityToken) {
          console.log('Apple Login -> Identity Token:', identityToken);

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
    <View>
      <Button title="Sign In with Apple" onPress={handleLoginPress} />
    </View>
  );
};

export default AppleLogin;
