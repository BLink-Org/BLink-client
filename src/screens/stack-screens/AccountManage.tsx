import {useMemo} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import BackHeader from '@/components/common/BackHeader';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import {
  type RootStackParamList,
  type RootStackNavigationProp,
} from '@/types/navigation';
import {FONTS} from '@/constants';
import NavigationInfo from '@/components/mypage/NavigationInfo';
import {type ITheme} from '@/types';

type AccountManageRouteProp = RouteProp<RootStackParamList, 'AccountManage'>;

const AccountManage = () => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const route = useRoute<AccountManageRouteProp>();
  const {email} = route.params;

  const navigation = useNavigation<RootStackNavigationProp>();

  // 계정 삭제 클릭 시
  const handleAccountDelete = () => {
    navigation.navigate('AccountDelete');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <BackHeader title="계정 관리" themeColor={theme.TEXT900} />
      <View style={styles.contentContainer}>
        <View style={styles.bodyContainer}>
          <Text style={styles.loginText}>로그인 한 계정</Text>
          <Text style={styles.emailText}>{email}</Text>
        </View>
        <NavigationInfo
          title="계정 삭제 신청"
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
