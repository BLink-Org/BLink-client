import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import {FONTS} from '@/constants';
import StaticInfo from '@/components/mypage/StaticInfo';
import {CheckBoxIcon, WarningIcon} from '@/assets/icons/mypage';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import AlertModal from '@/components/modal/AlertModal';
import {useModalStore} from '@/store/useModalStore';
import {type ITheme} from '@/types';

const AccountDelete = () => {
  const {theme} = useThemeStore();
  const {showModal, closeModal} = useModalStore();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // 계정 삭제 상태인지 아닌지 boolean 값으로 확인
  const isDeletedState = false;
  // const isDeletedState = true;

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleDeleteAccount = () => {
    showModal('deleteConfirm');
  };

  const handleConfirmDelete = () => {
    console.log('계정 삭제 신청 처리');
    closeModal('deleteConfirm');
  };

  const handleCancelDeleteAccount = () => {
    console.log('계정 삭제 철회하기');
  };

  const styles = useMemo(() => createStyles(theme), [theme]);

  if (isDeletedState) {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ThemeBackground />
          <BackHeader title="계정 삭제 신청" themeColor={theme.TEXT900} />
          <View style={styles.contentContainer}>
            <View style={styles.alertContainer}>
              <WarningIcon fill={theme.MAIN400} />
              <Text style={styles.alertText}>삭제 신청된 계정입니다.</Text>
            </View>
            <Text style={styles.infoText}>
              삭제 신청일 yyyy-mm-dd 기준 7일 이내{'\n'}삭제 신청을 취소하면
              원래의 계정 정보로{'\n'}B.Link를 계속 이용하실 수 있어요.
            </Text>
          </View>
        </SafeAreaView>
        <CustomBottomButton
          title="계정 삭제 철회하기"
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
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>저장 현황</Text>
          <StaticInfo linkCount={123} bookmarkCount={15} folderCount={3} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>계정 삭제 유의사항</Text>
          <View>
            <Text style={styles.infoText}>
              - 계정을 삭제하면 이런 문제가 있다는 것을 ...
            </Text>
            <Text style={styles.infoText}>
              - 계정을 삭제하면 이런 문제가 있다는 것을 ...
            </Text>
            <Text style={styles.infoText}>
              - 계정을 삭제하면 이런 문제가 있다는 것을 ...
            </Text>
          </View>
        </View>
        <View style={styles.checkContainer}>
          <TouchableOpacity onPress={handleCheck}>
            <CheckBoxIcon fill={isChecked ? theme.MAIN500 : theme.TEXT500} />
          </TouchableOpacity>
          <Text style={styles.checkText}>
            계정 삭제 유의사항을 숙지했습니다.
          </Text>
        </View>

        {/* alertModal 처리 */}
        <AlertModal
          modalId="deleteConfirm"
          headerText="계정 삭제 신청"
          bodyText="계정 삭제를 신청하시겠습니까?"
          leftText="취소"
          rightText="삭제"
          rightOnPress={handleConfirmDelete}
        />
      </SafeAreaView>
      <CustomBottomButton
        title="계정 삭제 신청"
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
    contentContainer: {
      paddingVertical: 20,
      paddingHorizontal: 18,
      gap: 12,
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
