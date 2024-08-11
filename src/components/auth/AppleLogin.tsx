import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {FONTS} from '@/constants';
import {AppleLogoIcon} from '@/assets/icons/onboarding';

const AppleLogin = () => {
  const handleLoginPress = () => {
    // TODO: Implement Apple Login
    console.log('Apple Login -> 구현 예정');
  };

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
