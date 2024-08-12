import {Image, StyleSheet, View} from 'react-native';

const LogoHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/blue-logo.png')}
        style={styles.logoImage}
      />
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoImage: {
    marginLeft: 4,
    width: 67,
    height: 24,
  },
});
