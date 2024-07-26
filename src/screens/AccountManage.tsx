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

type AccountManageRouteProp = RouteProp<RootStackParamList, 'AccountManage'>;

const AccountManage = () => {
  const route = useRoute<AccountManageRouteProp>();
  const {email} = route.params;
  const {theme} = useThemeStore();
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
          <Text style={[FONTS.BODY1_MEDIUM, {color: theme.TEXT800}]}>
            로그인 한 계정
          </Text>
          <Text style={[FONTS.BODY2_MEDIUM, {color: theme.MAIN500}]}>
            {email}
          </Text>
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
