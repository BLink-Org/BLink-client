import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {calculateByteLength} from '@/utils/link-utils';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import TextInputGroup from '@/components/common/TextInputGroup';

interface FolderContentProps {
  defaultText?: string; // defaultText 유 - 수정, 무 - 생성
  onSaveFolder: (textInput: string) => void;
  folderTitles: string[];
}

// 폴더 생성 및 수정 case
const FolderContent = ({
  defaultText,
  onSaveFolder,
  folderTitles,
}: FolderContentProps) => {
  const {t} = useTranslation();
  const [textInput, setTextInput] = useState<string | undefined>(defaultText);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isByteCountVisible, setIsByteCountVisible] = useState<boolean>(true);
  const [isReadyToSave, setIsReadyToSave] = useState<boolean>(!!defaultText);

  useEffect(() => {
    if (calculateByteLength(textInput) > 30) {
      setErrorMessage('');
      setIsByteCountVisible(true);
      setIsReadyToSave(false);
      return;
    }
    const isDuplicate =
      textInput !== defaultText &&
      folderTitles.some(folderName => folderName === textInput);

    if (isDuplicate) {
      setErrorMessage(t('이미 사용 중인 이름입니다.'));
      setIsByteCountVisible(false);
      setIsReadyToSave(false);
    } else {
      setErrorMessage('');
      setIsByteCountVisible(true);
      setIsReadyToSave(!!textInput);
    }
  }, [textInput, folderTitles]);

  return (
    <>
      <View style={styles.contentContainer}>
        <TextInputGroup
          inputTitle={t('폴더명')}
          placeholder={t('폴더명을 입력해주세요.')}
          {...{textInput, setTextInput, errorMessage, isByteCountVisible}}
        />
      </View>
      <CustomBottomButton
        title={t('저장')}
        onPress={() => textInput && onSaveFolder(textInput)}
        isDisabled={!isReadyToSave}
      />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 18,
  },
});

export default FolderContent;
