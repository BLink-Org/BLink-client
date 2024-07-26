import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '@/components/common/BackHeader';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import {type RootStackNavigationProp} from '@/types/navigation';

const AccountManage = () => {
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
        <Text>page</Text>
        <TouchableOpacity onPress={handleAccountDelete}>
          <Text>계정 삭제 신청</Text>
        </TouchableOpacity>
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
});
