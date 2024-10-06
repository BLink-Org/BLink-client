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
            다시 보고 싶은 <Text style={styles.blueText}>링크</Text>를{' '}
            <Text style={styles.blueText}>북마크</Text>
          </Text>
        ) : (
          <Text style={styles.bodyText}>
            <Text style={styles.blueText}>B</Text>ookmark your
            <Text style={styles.blueText}> Link</Text>s in a
          </Text>
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
    paddingBottom: 12,
    color: '#6B7684',
    ...FONTS.BODY1_MEDIUM,
  },
  blueText: {
    color: '#4A7DFF',
    ...FONTS.BODY1_MEDIUM,
  },
  gapImage: {
    height: 24,
  },
  logoImage: {
    width: 200,
    height: 67.61,
  },
  onboardingImage: {
    width: 212,
    height: 212,
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
