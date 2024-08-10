import {SafeAreaView, StyleSheet, Text} from 'react-native';
import GoogleLogin from '@/components/auth/GoogleLogin';
import AppleLogin from '@/components/auth/AppleLogin';

const Onboarding = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Onboarding</Text>
      <GoogleLogin />
      <AppleLogin />
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
