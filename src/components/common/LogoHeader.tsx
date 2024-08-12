import {StyleSheet, View} from 'react-native';
import {LogoImage} from '@/assets/icons/common';
import {useThemeStore} from '@/store/useThemeStore';

const LogoHeader = () => {
  const {theme} = useThemeStore();
  return (
    <View style={styles.container}>
      <LogoImage fill={theme.MAIN500} />
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
