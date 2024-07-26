import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {type RootStackNavigationProp} from '@/types/navigation';
import ThemeBackground from '@/components/common/ThemeBackground';
import LogoHeader from '@/components/common/LogoHeader';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import StaticInfo from '@/components/mypage/StaticInfo';
import NavigationInfo from '@/components/mypage/NavigationInfo';

const MyPage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {theme} = useThemeStore();

  // 임시 이메일 데이터
  const tempEmail = 'aksentemp5240@gmail.com';

  // Navigation Handler
  const handleAccountManage = () => {
    navigation.navigate('AccountManage', {email: tempEmail});
  };
  const handleThemeSetting = () => {
    navigation.navigate('ThemeSetting');
  };
  const handleSetting = () => {
    navigation.navigate('Setting');
  };
  const handleTrash = () => {
    navigation.navigate('Trash');
  };
  const handleSupport = () => {
    navigation.navigate('Support');
  };

  // 로그아웃 로직
  const handleLogout = () => {
    // 추후 추가 예정
    console.log('로그아웃');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <LogoHeader />
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.headerText}>
            <Text style={[FONTS.TITLE, {color: theme.TEXT900}]}>계정</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={[FONTS.BODY2_MEDIUM, {color: theme.MAIN500}]}>
              {tempEmail}
            </Text>
            <TouchableOpacity onPress={handleAccountManage}>
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
            <NavigationInfo
              title="테마 설정"
              themeColor={theme.TEXT800}
              onPress={handleThemeSetting}
            />
            <NavigationInfo
              title="환경 설정"
              themeColor={theme.TEXT800}
              onPress={handleSetting}
            />
            <NavigationInfo
              title="휴지통"
              themeColor={theme.TEXT800}
              onPress={handleTrash}
            />
            <NavigationInfo
              title="지원"
              themeColor={theme.TEXT800}
              onPress={handleSupport}
            />
            <NavigationInfo
              title="로그 아웃"
              themeColor={theme.TEXT800}
              onPress={handleLogout}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('WebViewTest')}>
              <Text>웹뷰테스트</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
