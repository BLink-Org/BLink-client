import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as RNLocalize from 'react-native-localize';
import GoogleLogin from '@/components/auth/GoogleLogin';
import AppleLogin from '@/components/auth/AppleLogin';
import {FONTS} from '@/constants';
import {type RootStackNavigationProp} from '@/types';
import {trackEvent} from '@/utils/amplitude-utils';

const Onboarding = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const locale = RNLocalize.getLocales()[0].languageCode === 'ko' ? 'KO' : 'EN';

  // 둘러보기 클릭 시
  const handleAround = () => {
    trackEvent('Explore_Mode_Usage');
    navigation.navigate('Tab', {
      screen: 'TempHome',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        {locale === 'KO' ? (
          <Text style={styles.bodyText}>
            중요한 링크 한번에 저장 한눈에 확인
          </Text>
        ) : (
          <Text style={styles.bodyText}>Bookmark links in a blink</Text>
        )}
        <Image
          source={require('@/assets/images/img-linksaving_wordmark-blue.png')}
          style={styles.logoImage}
        />
        <View style={styles.gapImage} />
        <Image
          source={require('@/assets/images/img-onboarding.png')}
          style={styles.onboardingImage}
        />
      </View>
      <View style={styles.loginContainer}>
        <GoogleLogin />
        <AppleLogin />
        <TouchableOpacity onPress={handleAround}>
          {locale === 'KO' ? (
            <Text style={styles.aroundText}>둘러보기</Text>
          ) : (
            <Text style={styles.aroundText}>Explore</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    marginBottom: 20,
    color: '#8AABFF',
    ...FONTS.BODY2_SEMIBOLD,
    textAlign: 'center',
    width: '100%',
    flexShrink: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  gapImage: {
    height: 20,
  },
  logoImage: {
    width: 200,
    height: 68.09,
  },
  onboardingImage: {
    width: 220,
    height: 220,
  },

  loginContainer: {
    paddingHorizontal: 18,
    gap: 10,
  },
  aroundText: {
    color: '#6B7684',
    textAlign: 'center',
    textDecorationLine: 'underline',
    paddingVertical: 10,
    ...FONTS.BODY3_MEDIUM,
  },
});
