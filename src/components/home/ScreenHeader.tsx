import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SidebarIcon} from '@/assets/icons/home';
import {useThemeStore} from '@/store/useThemeStore';

interface ScreenHeaderProps {
  toggleSideBar: () => void;
  isBookmark?: boolean;
}

const THEME_IMAGES = {
  3: require('@/assets/images/img-header-theme3.png'),
  4: require('@/assets/images/img-header-theme4.png'),
  default: require('@/assets/images/img-linksaving_wordmark-gray.png'),
} as const;

const ScreenHeader = ({toggleSideBar, isBookmark}: ScreenHeaderProps) => {
  const {theme} = useThemeStore();
  const themeNumber = theme.THEME_NUMBER;

  return (
    <View style={styles.container}>
      {!isBookmark ? (
        <TouchableOpacity onPress={toggleSideBar}>
          <SidebarIcon width={30} height={30} stroke={theme.TEXT900} />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightSpace} />
      )}
      <Image
        source={
          THEME_IMAGES[themeNumber as keyof typeof THEME_IMAGES] ||
          THEME_IMAGES.default
        }
        style={
          themeNumber === 3 || themeNumber === 4
            ? styles.logoImage2
            : styles.logoImage
        }
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
    width: 80,
    height: 26,
  },
  logoImage2: {
    width: 80,
    height: 26,
  },
  rightSpace: {
    width: 30,
  },
});
