import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {calculateByteLength} from '@/utils/calculateByteLength';
import TextInputGroup from '../common/TextInputGroup';
import CustomBottomButton from '../common/CustomBottomButton';

interface FolderSideBarProps {
  defaultText?: string;
  folderList: string[];
  toggleBottomSheet: () => void;
}

// 폴더 생성 및 수정 case
const FolderContent = ({
  defaultText,
  folderList,
  toggleBottomSheet,
}: FolderSideBarProps) => {
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
    const isDuplicate = folderList.some(folderName => folderName === textInput);
    if (isDuplicate) {
      setErrorMessage('이미 사용 중인 이름입니다');
      setIsByteCountVisible(false);
      setIsReadyToSave(false);
    } else {
      setErrorMessage('');
      setIsByteCountVisible(true);
      setIsReadyToSave(!!textInput);
    }
  }, [textInput, folderList]);

  return (
    <>
      <View style={styles.contentContainer}>
        <TextInputGroup
          inputTitle="폴더명"
          placeholder="폴더명을 입력해주세요"
          {...{textInput, setTextInput, errorMessage, isByteCountVisible}}
        />
      </View>
      <CustomBottomButton
        title="저장"
        onPress={toggleBottomSheet}
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
