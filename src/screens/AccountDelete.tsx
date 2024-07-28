import React, {useState} from 'react';
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

  if (isDeletedState) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemeBackground />
        <BackHeader title="계정 삭제 신청" themeColor={theme.TEXT900} />
        <View style={styles.contentContainer}>
          <View style={styles.alertContainer}>
            <WarningIcon />
            <Text style={[FONTS.BODY1_MEDIUM, {color: theme.TEXT900}]}>
              삭제 신청된 계정입니다.
            </Text>
          </View>
          <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT600}]}>
            삭제 신청일 yyyy-mm-dd 기준 7일 이내{'\n'}삭제 신청을 취소하면
            원래의 계정 정보로{'\n'}B.Link를 계속 이용하실 수 있어요.
          </Text>
        </View>
        <SafeAreaView style={styles.bottomContainer}>
          <CustomBottomButton
            title="계정 삭제 철회하기"
            onPress={handleCancelDeleteAccount}
            isDisabled={false}
          />
        </SafeAreaView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <BackHeader title="계정 삭제 신청" themeColor={theme.TEXT900} />
      <View style={styles.contentContainer}>
        <Text style={[FONTS.BODY1_MEDIUM, {color: theme.TEXT900}]}>
          저장 현황
        </Text>
        <StaticInfo linkCount={123} bookmarkCount={15} folderCount={3} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[FONTS.BODY1_MEDIUM, {color: theme.TEXT900}]}>
          계정 삭제 유의사항
        </Text>
        <View>
          <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT600}]}>
            - 계정을 삭제하면 이런 문제가 있다는 것을 ...
          </Text>
          <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT600}]}>
            - 계정을 삭제하면 이런 문제가 있다는 것을 ...
          </Text>
          <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT600}]}>
            - 계정을 삭제하면 이런 문제가 있다는 것을 ...
          </Text>
        </View>
      </View>
      <View style={styles.checkContainer}>
        <TouchableOpacity onPress={handleCheck}>
          <CheckBoxIcon fill={isChecked ? theme.MAIN500 : theme.TEXT500} />
        </TouchableOpacity>
        <Text style={[FONTS.BODY2_MEDIUM, {color: theme.TEXT900}]}>
          계정 삭제 유의사항을 숙지했습니다.
        </Text>
      </View>
      <SafeAreaView style={styles.bottomContainer}>
        <CustomBottomButton
          title="계정 삭제 신청"
          onPress={handleDeleteAccount}
          isDisabled={!isChecked}
        />
      </SafeAreaView>

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
  );
};

export default AccountDelete;

const styles = StyleSheet.create({
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
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
