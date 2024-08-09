import {useEffect} from 'react';
import {Button, SafeAreaView} from 'react-native';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {CLIENT_ID, IOS_CLIENT_ID} from '@env';
import {useGoogleLogin} from '@/api/hooks/useAuth';
import {useUserStore} from '@/store/useUserStore';

const GoogleLogin = () => {
  const googleLoginMutation = useGoogleLogin();
  const {setTokens} = useUserStore();

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const idToken = userInfo.idToken;
      if (idToken) {
        googleLoginMutation.mutate(idToken, {
          onSuccess: data => {
            const {accessToken, refreshToken} = data;
            (async () => {
              try {
                await setTokens(accessToken, refreshToken);
              } catch (error) {
                console.error('Error setting tokens:', error);
              }
            })();
          },
        });
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('User cancelled the login flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('Operation (e.g. sign in) is in progress already');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('Play services not available or outdated');
        } else {
          console.error('Error:', error);
        }
      } else {
        console.error('without error code:', error);
      }
    }
  };

  const handleLoginPress = () => {
    handleLogin().catch(error => console.error(error));
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  return (
    <SafeAreaView>
      <Button title="Sign In with Google" onPress={handleLoginPress} />
    </SafeAreaView>
  );
};

export default GoogleLogin;
