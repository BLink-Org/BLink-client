import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {type RootStackNavigationProp} from '@/types/navigation';
import ThemeBackground from '@/components/common/ThemeBackground';
import LogoHeader from '@/components/common/LogoHeader';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import StaticInfo from '@/components/mypage/StaticInfo';
import NavigationInfo from '@/components/mypage/NavigationInfo';

// const TempView = () => {
//   const navigation = useNavigation<RootStackNavigationProp>();

//   return (
//     <>
//       <Button
//         title="테마 설정"
//         onPress={() => navigation.navigate('ThemeSetting')}
//       />
//       <Button
//         title="WebViewTest"
//         onPress={() => navigation.navigate('WebViewTest')}
//       />
//     </>
//   );
// };

const MyPage = () => {
  // const navigation = useNavigation<RootStackNavigationProp>();
  const {theme} = useThemeStore();

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <LogoHeader />
      <View style={styles.contentContainer}>
        <View style={styles.headerText}>
          <Text style={[FONTS.TITLE, {color: theme.TEXT900}]}>계정</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={[FONTS.BODY2_MEDIUM, {color: theme.MAIN500}]}>
            이메일@gmail.com
          </Text>
          <TouchableOpacity>
            <Text style={[FONTS.BODY2_MEDIUM, {color: theme.TEXT500}]}>
              계정 관리
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.staticInfoContainer}>
          <StaticInfo linkCount={123} bookmarkCount={15} folderCount={3} />
        </View>
        <View style={[styles.divider, {borderBottomColor: theme.TEXT200}]} />
        <View style={styles.navigationContainer}>
          <TouchableOpacity>
            <NavigationInfo title="테마 설정" />
          </TouchableOpacity>
          <TouchableOpacity>
            <NavigationInfo title="환경 설정" />
          </TouchableOpacity>
          <TouchableOpacity>
            <NavigationInfo title="휴지통" />
          </TouchableOpacity>
          <TouchableOpacity>
            <NavigationInfo title="지원" />
          </TouchableOpacity>
          <TouchableOpacity>
            <NavigationInfo title="로그 아웃" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
  },
  headerText: {
    paddingVertical: 14,
  },
  navigationContainer: {
    paddingVertical: 12,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  staticInfoContainer: {
    paddingVertical: 16,
  },
  divider: {
    borderBottomWidth: 1,
    marginHorizontal: -18,
  },
});
