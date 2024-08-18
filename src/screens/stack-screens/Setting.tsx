import {useMemo} from 'react';
import {
  Alert,
  Linking,
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import NavigationInfo from '@/components/mypage/NavigationInfo';
import {FONTS} from '@/constants';
import {type ITheme} from '@/types';

const Setting = () => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // 알람 설정 -> 추후 추가 예정
  // const [isToggled, setIsToggled] = useState<boolean>(false);

  // // 알람 설정 클릭 시
  // const handleAlarm = () => {
  //   setIsToggled(!isToggled);
  // };

  // 언어 설정 클릭 시 (논의 필요)
  const handleLanguage = () => {
    if (Platform.OS === 'ios') {
      Linking.openSettings();
    } else {
      if (NativeModules.OpenExternalURLModule) {
        NativeModules.OpenExternalURLModule.linkAndroidSettings();
      } else {
        Alert.alert('Error', 'Unable to open Android language settings.');
      }
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

        {/* <View style={styles.bodyContainer}>
          <Text style={styles.bodyText}>알림</Text>
          <CustomToggle isToggled={isToggled} onToggleChange={handleAlarm} />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
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
    bodyText: {
      ...FONTS.BODY1_MEDIUM,
      color: theme.TEXT800,
    },
  });
