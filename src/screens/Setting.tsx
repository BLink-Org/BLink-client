import {useState} from 'react';
import {
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import NavigationInfo from '@/components/mypage/NavigationInfo';
import {FONTS} from '@/constants';
import CustomToggle from '@/components/common/CustomToggle';

const Setting = () => {
  const {theme} = useThemeStore();
  const [isToggled, setIsToggled] = useState<boolean>(false);

  // 알람 설정 클릭 시
  const handleAlarm = () => {
    setIsToggled(!isToggled);
  };

  // 언어 설정 클릭 시 (논의 필요)
  const handleLanguage = () => {
    if (Platform.OS === 'ios') {
      Linking.openSettings();
    } else {
      Linking.openURL('android.settings.LOCALE_SETTINGS');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <BackHeader title="환경 설정" themeColor={theme.TEXT900} />

      <View style={styles.contentContainer}>
        <NavigationInfo
          title="언어"
          themeColor={theme.TEXT800}
          onPress={handleLanguage}
        />

        <View style={styles.bodyContainer}>
          <Text style={[FONTS.BODY1_MEDIUM, {color: theme.TEXT800}]}>알림</Text>
          <CustomToggle isToggled={isToggled} onToggleChange={handleAlarm} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
  },
  bodyContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
