import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SidebarIcon} from '@/assets/icons/home';
import {useThemeStore} from '@/store/useThemeStore';

interface ScreenHeaderProps {
  toggleSideBar: () => void;
  isBookmark?: boolean;
}

const ScreenHeader = ({toggleSideBar, isBookmark}: ScreenHeaderProps) => {
  console.log(
    '🚀 ~ file: ScreenHeader.tsx:11 ~ ScreenHeader ~ isBookmark:',
    isBookmark,
  );
  const {theme} = useThemeStore();
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
    width: 67,
    height: 24,
  },
  rightSpace: {
    width: 30,
  },
});
