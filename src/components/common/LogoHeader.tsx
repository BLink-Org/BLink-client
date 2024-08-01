import {StyleSheet, View} from 'react-native';
import {LogoImage} from '@/assets/icons/common';

const LogoHeader = () => {
  return (
    <View style={styles.container}>
      <LogoImage />
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
});
