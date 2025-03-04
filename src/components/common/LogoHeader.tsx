import {Image, StyleSheet, View} from 'react-native';

const LogoHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/img-linksaving_wordmark-gray.png')}
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
    width: 80,
    height: 26,
  },
});
