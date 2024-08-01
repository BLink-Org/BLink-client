import React, {useMemo} from 'react';
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
import {useModalStore} from '@/store/useModalStore';
import AlertModal from '@/components/modal/AlertModal';
import {type ITheme} from '@/types';

const MyPage = () => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigation = useNavigation<RootStackNavigationProp>();

  const {showModal, closeModal} = useModalStore();

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

  const logoutModalOpen = () => {
    showModal('logoutConfirm');
  };

  // 로그아웃 시 로직
  const handleConfirmLogout = () => {
    console.log('로그아웃');
    closeModal('logoutConfirm');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <LogoHeader />
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.headerText}>
            <Text style={styles.titleText}>계정</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.emailText}>{tempEmail}</Text>
            <TouchableOpacity onPress={handleAccountManage}>
              <Text style={styles.accountManageText}>계정 관리</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.staticInfoContainer}>
            <StaticInfo linkCount={123} bookmarkCount={15} folderCount={3} />
          </View>
          <View style={styles.divider} />
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
              title="로그아웃"
              themeColor={theme.TEXT800}
              onPress={logoutModalOpen}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('WebViewTest')}
              style={{paddingVertical: 30}}>
              <Text>test</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* alertModal 처리 */}
      <AlertModal
        modalId="logoutConfirm"
        headerText="로그아웃"
        bodyText="로그아웃 하시겠습니까?"
        leftText="취소"
        rightText="확인"
        rightOnPress={handleConfirmLogout}
      />
    </SafeAreaView>
  );
};

export default MyPage;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: 18,
    },
    headerText: {
      paddingVertical: 14,
    },
    titleText: {
      color: theme.TEXT900,
      ...FONTS.TITLE,
    },
    userInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 2,
    },
    emailText: {
      color: theme.MAIN500,
      ...FONTS.BODY2_MEDIUM,
    },
    accountManageText: {
      color: theme.TEXT500,
      ...FONTS.BODY2_MEDIUM,
    },
    staticInfoContainer: {
      paddingVertical: 16,
    },
    divider: {
      borderBottomWidth: 1,
      marginHorizontal: -18,
      borderBottomColor: theme.TEXT200,
    },
    navigationContainer: {
      paddingVertical: 12,
    },
  });
