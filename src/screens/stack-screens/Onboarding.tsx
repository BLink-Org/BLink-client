import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import GoogleLogin from '@/components/auth/GoogleLogin';
import AppleLogin from '@/components/auth/AppleLogin';
import {FONTS} from '@/constants';

const Onboarding = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer} />
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyText}>
          다시 보고 싶은 <Text style={styles.blueText}>링크</Text>를{' '}
          <Text style={styles.blueText}>북마크</Text>
        </Text>

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
        <TouchableOpacity>
          <Text style={styles.aroundText}>둘러보기</Text>
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
  headerContainer: {
    flex: 1,
  },
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
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
    ...FONTS.CAPTION_MEDIUM,
  },
});
