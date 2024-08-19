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
import {useTranslation} from 'react-i18next';
import BackHeader from '@/components/common/BackHeader';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import NavigationInfo from '@/components/mypage/NavigationInfo';
import {FONTS} from '@/constants';
import {type ITheme} from '@/types';
import {useModalStore} from '@/store/useModalStore';
import AlertModal from '@/components/modal/AlertModal';
import {trackEvent} from '@/utils/amplitude-utils';

const Setting = () => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {t} = useTranslation();
  const {showModal, closeModal} = useModalStore();
  const modalId = 'languageSettingModal';

  const handleLanguage = () => {
    showModal(modalId);
  };

  const handleNavigateToSettings = () => {
    trackEvent('Move_To_Settings_Language');
    closeModal(modalId); // 모달 닫기
    if (Platform.OS === 'ios') {
      Linking.openSettings(); // iOS 설정창 열기
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
      <BackHeader title={t('환경 설정')} themeColor={theme.TEXT900} />

      <View style={styles.contentContainer}>
        <NavigationInfo
          title={t('언어')}
          themeColor={theme.TEXT800}
          onPress={handleLanguage}
        />
      </View>

      {/* 언어 선택 모달 */}
      <AlertModal
        modalId={modalId}
        headerText={t('설정 창으로 이동합니다')}
        bodyText={t(
          '설정 > 목록에서 B.Link 선택 > 언어에서 언어를 변경해주세요',
        )}
        leftText={t('취소')}
        rightText={t('확인')}
        rightOnPress={handleNavigateToSettings}
      />
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
