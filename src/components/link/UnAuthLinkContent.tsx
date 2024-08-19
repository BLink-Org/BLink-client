import React, {useEffect, useState, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {AddIcon} from '@/assets/icons/common';
import {useBottomButtonSizeStore} from '@/store/useBottomButtonSizeStore';
import {type RootStackNavigationProp, type ITheme} from '@/types';
import TextInputGroup from '@/components/common/TextInputGroup';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import LoginModal from '@/components/modal/LoginModal';

interface FolderSideBarProps {
  defaultURL?: string;
  toggleBottomSheet: () => void;
}

const UnAuthLinkContent = ({
  defaultURL,
  toggleBottomSheet,
}: FolderSideBarProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {t} = useTranslation();

  const navigation = useNavigation<RootStackNavigationProp>();

  const [isNoticeModalVisible, setIsNoticeModalVisible] = useState(false);

  // 모달 닫은 후 로그인으로 이동
  const handleModalClose = () => {
    navigation.navigate('Onboarding');
    setIsNoticeModalVisible(false);
  };

  const onPressLoginAlert = () => {
    setIsNoticeModalVisible(true);
  };

  const [textInput, setTextInput] = useState<string | undefined>(defaultURL);
  const errorMessage = '';
  const [isReadyToSave, setIsReadyToSave] = useState<boolean>(!!defaultURL);

  const {buttonHeight} = useBottomButtonSizeStore();

  // 1글자라도 입력하면 save버튼 활성화
  useEffect(() => {
    setIsReadyToSave(!!textInput);
  }, [textInput]);

  return (
    <>
      <SafeAreaView
        style={[styles.contentContainer, {marginBottom: buttonHeight}]}>
        <TextInputGroup
          inputTitle={t('링크')}
          placeholder={t('링크를 입력해주세요.')}
          textInput={textInput}
          setTextInput={setTextInput}
          errorMessage={errorMessage}
        />
        <View style={styles.folderTitle}>
          <Text style={styles.folderTitleText}>{t('폴더')}</Text>
          <TouchableOpacity
            style={styles.addContainer}
            onPress={onPressLoginAlert}>
            <AddIcon stroke={theme.BACKGROUND} fill={theme.MAIN400} />
          </TouchableOpacity>
        </View>
        <View style={styles.folderView}>
          <View style={styles.folderContainer}>
            <Text style={styles.folderText}>{t('폴더 없이 저장')}</Text>
          </View>
        </View>
      </SafeAreaView>
      <CustomBottomButton
        title={t('저장')}
        onPress={onPressLoginAlert}
        isDisabled={!isReadyToSave}
      />
      {/* 로그인 모달 추가 */}
      <LoginModal
        isVisible={isNoticeModalVisible}
        onClose={() => setIsNoticeModalVisible(false)}
        onClick={handleModalClose}
      />
    </>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      paddingHorizontal: 18,
    },
    folderTitle: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 32,
      alignItems: 'center',
    },
    folderTitleText: {
      color: theme.MAIN500,
      marginRight: 4,
      ...FONTS.BODY1_SEMIBOLD,
    },
    addContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 4,
      paddingVertical: 4,
      paddingHorizontal: 8,
      alignItems: 'center',
    },
    addText: {
      color: theme.TEXT700,
      ...FONTS.BODY1_SEMIBOLD,
    },
    folderView: {
      flex: 1,
      paddingVertical: 12,
      marginBottom: 35,
    },
    folderContainer: {
      borderBottomWidth: 1,
      backgroundColor: theme.TEXT100,
      borderWidth: 1,
      borderColor: theme.TEXT200,
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 8,
    },
    folderText: {
      color: theme.TEXT900,
      ...FONTS.BODY1_MEDIUM,
    },
  });

export default UnAuthLinkContent;
