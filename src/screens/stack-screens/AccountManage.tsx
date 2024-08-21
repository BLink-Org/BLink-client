import {useMemo} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import BackHeader from '@/components/common/BackHeader';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import {type RootStackNavigationProp} from '@/types/navigation';
import {FONTS} from '@/constants';
import NavigationInfo from '@/components/mypage/NavigationInfo';
import {type ITheme} from '@/types';
import {useUserInfo} from '@/api/hooks/useUser';

const AccountManage = () => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {t} = useTranslation();

  const {data: userInfoData} = useUserInfo();
  const navigation = useNavigation<RootStackNavigationProp>();

  // 계정 삭제 클릭 시
  const handleAccountDelete = () => {
    navigation.navigate('AccountDelete');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <BackHeader title={t('계정 관리')} themeColor={theme.TEXT900} />

      <View style={styles.contentContainer}>
        <View style={styles.bodyContainer}>
          <Text style={styles.loginText}>{t('로그인 한 계정')}</Text>

          <Text style={styles.emailText}>{userInfoData?.email}</Text>
        </View>
        <NavigationInfo
          title={t('계정 삭제')}
          themeColor={theme.TEXT800}
          onPress={handleAccountDelete}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountManage;

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
    loginText: {
      color: theme.TEXT800,
      ...FONTS.BODY1_MEDIUM,
    },
    emailText: {
      color: theme.MAIN500,
      ...FONTS.BODY2_MEDIUM,
    },
  });
