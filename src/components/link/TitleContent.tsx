import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {calculateByteLength} from '@/utils/link-utils';
import TextInputGroup from '@/components/common/TextInputGroup';
import CustomBottomButton from '@/components/common/CustomBottomButton';

interface TitleContentProps {
  defaultText: string;
  toggleBottomSheet: () => void;
}

// 제목 수정 case
const TitleContent = ({defaultText, toggleBottomSheet}: TitleContentProps) => {
  const [textInput, setTextInput] = useState<string | undefined>(defaultText);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isByteCountVisible, setIsByteCountVisible] = useState<boolean>(true);
  const [isReadyToSave, setIsReadyToSave] = useState<boolean>(!!defaultText);

  useEffect(() => {
    if (calculateByteLength(textInput) > 30) {
      setErrorMessage('');
      setIsByteCountVisible(true);
      setIsReadyToSave(false);
    } else {
      setErrorMessage('');
      setIsByteCountVisible(true);
      setIsReadyToSave(!!textInput);
    }
  }, [textInput]);

  return (
    <>
      <View style={styles.contentContainer}>
        <TextInputGroup
          inputTitle="제목"
          placeholder="제목을 입력해주세요"
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

export default TitleContent;
