import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {LogoImage} from '@/assets/icons/common';
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
      <LogoImage fill={theme.MAIN500} />
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
  rightSpace: {
    width: 28,
  },
});
