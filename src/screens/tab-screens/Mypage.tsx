import React, {useCallback, useEffect, useMemo} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  type MyPageRouteProp,
  type RootStackNavigationProp,
} from '@/types/navigation';
import ThemeBackground from '@/components/common/ThemeBackground';
import LogoHeader from '@/components/common/LogoHeader';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import StaticInfo from '@/components/mypage/StaticInfo';
import NavigationInfo from '@/components/mypage/NavigationInfo';
import {useModalStore} from '@/store/useModalStore';
import AlertModal from '@/components/modal/AlertModal';
import {type ITheme} from '@/types';
import {signOut} from '@/utils/auth-utils';
import {useLogout} from '@/api/hooks/useAuth';
import {useUserStore} from '@/store/useUserStore';
import {trackEvent} from '@/utils/amplitude-utils';
import {useUserInfo} from '@/api/hooks/useUser';
import CustomLoading from '@/components/common/CustomLoading';
import DeletedTrueContainer from '@/components/mypage/DeletedTrueContainer';
import useToast from '@/hooks/useToast';
import {TOAST_MESSAGE} from '@/constants/toast';

const MyPage = () => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const {data: userInfoData, isLoading, isError, refetch} = useUserInfo();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const {refreshToken} = useUserStore.getState();

  const route = useRoute<MyPageRouteProp>();
  const navigation = useNavigation<RootStackNavigationProp>();

  const {renderToast, showToast} = useToast({marginBottom: 44});
  useEffect(() => {
    if (!route.params?.toastState) return;
    if (route.params?.toastState === 'delete') {
      showToast(TOAST_MESSAGE.DELETE_ACCOUNT);
    } else if (route.params?.toastState === 'cancel') {
      showToast(TOAST_MESSAGE.DELETE_ACCOUNT_CANCEL);
    }
    navigation.setParams({toastState: null});
  }, [route.params?.toastState]);

  // 애플 이메일 제공 x 유저 -> 이메일 정보 분기 처리
  const email = userInfoData?.email;
  const displayEmail = email?.endsWith('@privaterelay.appleid.com')
    ? '애플 가상 이메일입니다'
    : email;

  // 로그아웃 post
  const {mutate: logout} = useLogout();
  const {showModal, closeModal} = useModalStore();

  // Navigation Handlers
  const handleAccountManage = () => navigation.navigate('AccountManage');
  const handleThemeSetting = () => navigation.navigate('ThemeSetting');
  const handleSetting = () => navigation.navigate('Setting');
  const handleTrash = () => navigation.navigate('Trash');
  const handleSupport = () => navigation.navigate('Support');

  const logoutModalOpen = () => showModal('logoutConfirm');
  const handleConfirmLogout = () => {
    closeModal('logoutConfirm');
    if (refreshToken) {
      logout(refreshToken);
      trackEvent('Logout');
    }
    signOut();
  };

  if (isLoading) return <CustomLoading />;
  if (isError) return <Text>error</Text>;

  return (
    <SafeAreaView style={styles.container}>
      {renderToast()}
      <ThemeBackground />
      <LogoHeader />
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.headerText}>
            <Text style={styles.titleText}>계정</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.emailText}>{displayEmail}</Text>
            <TouchableOpacity onPress={handleAccountManage}>
              <Text style={styles.accountManageText}>계정 관리</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.staticInfoContainer}>
            {userInfoData?.deleteRequest ? (
              <DeletedTrueContainer />
            ) : (
              <StaticInfo
                linkCount={userInfoData?.linkCount}
                bookmarkCount={userInfoData?.pinCount}
                folderCount={userInfoData?.folderCount}
              />
            )}
          </View>
          <View style={styles.divider} />
          <View style={styles.navigationContainer}>
            <NavigationInfo
              title="테마"
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
          </View>
        </View>
      </ScrollView>
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
