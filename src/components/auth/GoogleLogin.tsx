import {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as amplitude from '@amplitude/analytics-react-native';
import * as RNLocalize from 'react-native-localize';
import {CLIENT_ID, IOS_CLIENT_ID, AMPLITUDE_API_KEY} from '@env';
import {useGoogleLogin} from '@/api/hooks/useAuth';
import {useUserStore} from '@/store/useUserStore';
import {type TokensSchema} from '@/types';
import {FONTS} from '@/constants';
import {trackEvent} from '@/utils/amplitude-utils';

const GoogleLogin = () => {
  const {setTokens} = useUserStore();
  const [userEmail, setUserEmail] = useState<string>('');

  const locale = RNLocalize.getLocales()[0].languageCode === 'ko' ? 'KO' : 'EN';

  const {mutate: googleLoginMutation} = useGoogleLogin({
    onSuccess: async (data: TokensSchema) => {
      const {accessToken, refreshToken} = data;
      await setTokens(accessToken, refreshToken);
      amplitude.init(AMPLITUDE_API_KEY, userEmail);
      trackEvent('SignUp_Complete', {method: 'Google'});
    },
  });

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken;
      if (idToken) {
        setUserEmail(userInfo.user.email);
        googleLoginMutation({language: locale, idToken});
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('User cancelled the login flow');
          trackEvent('SignUp_Quit', {method: 'Google'});
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
        {locale === 'KO' ? (
          <Image
            source={require('@/assets/images/img-google-ko.png')}
            style={styles.logoImage}
          />
        ) : (
          <Image
            source={require('@/assets/images/img-google-en.png')}
            style={styles.logoImageEn}
          />
        )}
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
    borderWidth: 1,
    borderColor: '#CCD4DD',
  },
  logoImage: {
    width: 184,
    height: 23,
  },
  logoImageEn: {
    width: 200,
    height: 23,
  },
  logoText: {
    color: '#000',
    ...FONTS.BODY1_SEMIBOLD,
  },
});
