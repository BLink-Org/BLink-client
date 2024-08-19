import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import BackHeader from '@/components/common/BackHeader';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import {FONTS} from '@/constants';
import StaticInfo from '@/components/mypage/StaticInfo';
import {CheckBoxIcon, WarningIcon} from '@/assets/icons/mypage';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import AlertModal from '@/components/modal/AlertModal';
import {useModalStore} from '@/store/useModalStore';
import {type RootStackNavigationProp, type ITheme} from '@/types';
import {
  useCancelDeleteUserAccount,
  useDeleteUserAccount,
  useUserInfo,
} from '@/api/hooks/useUser';

const AccountDelete = () => {
  const {t} = useTranslation();
  const {data: userInfoData, refetch: refetchUserInfo} = useUserInfo();
  const queryClient = useQueryClient();
  const navigation = useNavigation<RootStackNavigationProp>();

  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {showModal, closeModal} = useModalStore();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // 계정 삭제 상태인지 아닌지 boolean 값으로 확인
  const isDeletedState = userInfoData?.deleteRequest;

  const {mutate: deleteUserAccount} = useDeleteUserAccount({
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userInfo']});
    },
    onSettled: async () => {
      await refetchUserInfo();
      navigation.navigate('mypage', {toastState: 'delete'});
    },
  });
  const {mutate: cancelDeleteAccount} = useCancelDeleteUserAccount({
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userInfo']});
    },
    onSettled: async () => {
      await refetchUserInfo();
      navigation.navigate('mypage', {toastState: 'cancel'});
    },
  });

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleDeleteAccount = () => {
    showModal('deleteConfirm');
  };

  const handleConfirmDelete = () => {
    deleteUserAccount();
    closeModal('deleteConfirm');
  };

  const handleCancelDeleteAccount = () => {
    cancelDeleteAccount();
  };

  if (isDeletedState) {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ThemeBackground />
          <BackHeader title={t('계정 삭제 신청')} themeColor={theme.TEXT900} />
          <View style={styles.contentContainer}>
            <View style={styles.alertContainer}>
              <WarningIcon fill={theme.MAIN400} />
              <Text style={styles.alertText}>
                {t('삭제 신청된 계정입니다.')}
              </Text>
            </View>

            <View style={styles.deleteInfoContainer}>
              <Text style={styles.infoText}>
                {t('삭제_신청_일', {
                  deleteRequestDate: userInfoData.deleteRequestDate,
                })}
              </Text>
            </View>
          </View>
        </SafeAreaView>
        <CustomBottomButton
          title={t('계정 삭제 철회하기')}
          onPress={handleCancelDeleteAccount}
          isDisabled={false}
        />
      </>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ThemeBackground />
        <BackHeader title="계정 삭제 신청" themeColor={theme.TEXT900} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>{t('저장 현황')}</Text>
            <StaticInfo
              linkCount={userInfoData?.linkCount}
              bookmarkCount={userInfoData?.pinCount}
              folderCount={userInfoData?.folderCount}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>{t('계정 삭제 유의사항')}</Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoText}>
                {t('- 계정 삭제 신청 7일 뒤 계정이 완전히 삭제됩니다.\n')}
              </Text>
              <Text style={styles.infoText}>
                {t(
                  '- 계정이 삭제될 때에는 해당 계정으로 B.Link에 저장한 모든 링크와 폴더가 삭제됩니다.\n',
                )}
              </Text>
              <Text style={styles.infoText}>
                {t(
                  '- 계정이 삭제된 후에는 같은 계정으로 재가입하더라도 삭제된 정보는 복구할 수 없습니다.\n',
                )}
              </Text>
              <Text style={styles.infoText}>
                {t(
                  '- 계정 삭제를 철회하고 싶다면 계정 삭제를 신청한 지 7일이 경과하기 전 요청해주세요.\n',
                )}
              </Text>
              <Text style={styles.infoText}>
                {t(
                  '- 계정 삭제 철회는 [My] > [계정 관리] > [계정 삭제 신청]에서 할 수 있습니다.',
                )}
              </Text>
            </Text>
          </View>
          <View style={styles.checkContainer}>
            <TouchableOpacity onPress={handleCheck}>
              <CheckBoxIcon fill={isChecked ? theme.MAIN500 : theme.TEXT500} />
            </TouchableOpacity>
            <Text style={styles.checkText}>
              {t('계정 삭제 유의사항을 숙지했습니다.')}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <AlertModal
        modalId="deleteConfirm"
        headerText={t('계정 삭제 신청')}
        bodyText={t('계정을 삭제하시겠습니까?')}
        leftText={t('취소')}
        rightText={t('삭제')}
        rightOnPress={handleConfirmDelete}
      />
      <CustomBottomButton
        title={t('계정 삭제 신청')}
        onPress={handleDeleteAccount}
        isDisabled={!isChecked}
      />
    </>
  );
};

export default AccountDelete;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: 80,
    },
    contentContainer: {
      paddingVertical: 20,
      paddingHorizontal: 18,
      gap: 12,
    },
    deleteInfoContainer: {
      marginRight: 25,
    },
    alertContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    checkContainer: {
      paddingHorizontal: 18,
      paddingVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    alertText: {
      color: theme.TEXT900,
      ...FONTS.BODY1_MEDIUM,
    },
    infoText: {
      color: theme.TEXT600,
      ...FONTS.BODY2_REGULAR,
    },
    sectionTitle: {
      color: theme.TEXT900,
      ...FONTS.BODY1_MEDIUM,
    },
    checkText: {
      color: theme.TEXT900,
      ...FONTS.BODY2_MEDIUM,
    },
  });
