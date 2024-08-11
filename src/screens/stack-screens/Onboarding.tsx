import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import GoogleLogin from '@/components/auth/GoogleLogin';
import AppleLogin from '@/components/auth/AppleLogin';
import {FONTS} from '@/constants';
import {
  Onboarding1Image,
  Onboarding2Image,
  Onboarding3Image,
} from '@/assets/icons/onboarding';
import Carousel from '@/components/onboarding/Carousel';

const screenWidth = Dimensions.get('screen').width;

const onboardingImages = [
  {key: '1', image: <Onboarding1Image />},
  {key: '2', image: <Onboarding2Image />},
  {key: '3', image: <Onboarding3Image />},
];

const Onboarding = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
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
    backgroundColor: '#6D96FF',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginContainer: {
    paddingHorizontal: 18,
    gap: 10,
  },
  aroundText: {
    color: '#ECF1F5',
    textAlign: 'center',
    textDecorationLine: 'underline',
    paddingVertical: 10,
    ...FONTS.CAPTION_MEDIUM,
  },
});
