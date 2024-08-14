import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as amplitude from '@amplitude/analytics-react-native';
import {CLIENT_ID, IOS_CLIENT_ID, AMPLITUDE_API_KEY} from '@env';
import {useGoogleLogin} from '@/api/hooks/useAuth';
import {useUserStore} from '@/store/useUserStore';
import {type TokensSchema} from '@/types';
import {GoogleLogoIcon} from '@/assets/icons/onboarding';
import {FONTS} from '@/constants';
import {trackEvent} from '@/utils/amplitude-utils';

const GoogleLogin = () => {
  const {setTokens} = useUserStore();
  const [userEmail, setUserEmail] = useState<string>('');

  const {mutate: googleLoginMutation} = useGoogleLogin({
    onSuccess: async (data: TokensSchema) => {
      const {accessToken, refreshToken} = data;
      await setTokens(accessToken, refreshToken);
      amplitude.init(AMPLITUDE_API_KEY, userEmail);
      trackEvent('Login Success', {method: 'Google'});
    },
  });

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken;
      if (idToken) {
        setUserEmail(userInfo.user.email);
        googleLoginMutation(idToken);
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
    <TouchableOpacity onPress={handleLoginPress}>
      <View style={styles.logo}>
        <GoogleLogoIcon />
        <Text style={styles.logoText}>Google로 시작하기</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  logo: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    height: 54,
    borderRadius: 100,
  },
  logoText: {
    color: '#000',
    ...FONTS.BODY1_SEMIBOLD,
  },
});
