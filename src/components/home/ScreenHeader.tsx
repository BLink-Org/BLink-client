import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SidebarIcon} from '@/assets/icons/home';
import {useThemeStore} from '@/store/useThemeStore';

interface ScreenHeaderProps {
  toggleSideBar: () => void;
}

const ScreenHeader = ({toggleSideBar}: ScreenHeaderProps) => {
  const {theme} = useThemeStore();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleSideBar}>
        <SidebarIcon stroke={theme.TEXT900} />
      </TouchableOpacity>
      <Image
        source={require('@/assets/images/img-linksaving_wordmark-blue.png')}
        style={styles.logoImage}
      />
      <View style={styles.rightSpace} />
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoImage: {
    marginLeft: 4,
    width: 67,
    height: 24,
  },
  rightSpace: {
    width: 26,
  },
});
