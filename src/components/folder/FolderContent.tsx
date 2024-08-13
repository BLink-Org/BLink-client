import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {calculateByteLength} from '@/utils/link-utils';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import TextInputGroup from '@/components/common/TextInputGroup';
import {useCreateFolder, useFolders} from '@/api/hooks/useFolder';

interface FolderContentProps {
  defaultText?: string; // defaultText 유 - 수정, 무 - 생성
  toggleBottomSheet: () => void;
  folderTitles: string[];
}

// 폴더 생성 및 수정 case
const FolderContent = ({
  defaultText,
  toggleBottomSheet,
  folderTitles,
}: FolderContentProps) => {
  const [textInput, setTextInput] = useState<string | undefined>(defaultText);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isByteCountVisible, setIsByteCountVisible] = useState<boolean>(true);
  const [isReadyToSave, setIsReadyToSave] = useState<boolean>(!!defaultText);

  const {refetch: refetchUserInfo} = useFolders();
  const {mutate: createFolder} = useCreateFolder({
    onSettled: async () => {
      await refetchUserInfo();
      toggleBottomSheet();
    },
  });

  useEffect(() => {
    if (calculateByteLength(textInput) > 30) {
      setErrorMessage('');
      setIsByteCountVisible(true);
      setIsReadyToSave(false);
      return;
    }
    const isDuplicate = folderTitles.some(
      folderName => folderName === textInput,
    );
    if (isDuplicate) {
      setErrorMessage('이미 사용 중인 이름입니다');
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
          inputTitle="폴더명"
          placeholder="폴더명을 입력해주세요"
          {...{textInput, setTextInput, errorMessage, isByteCountVisible}}
        />
      </View>
      <CustomBottomButton
        title="저장"
        onPress={() => {
          !defaultText && textInput && createFolder({title: textInput});
        }}
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
