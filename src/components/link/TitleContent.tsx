import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {calculateByteLength} from '@/utils/link-utils';
import TextInputGroup from '@/components/common/TextInputGroup';
import CustomBottomButton from '@/components/common/CustomBottomButton';

interface TitleContentProps {
  defaultText: string;
  toggleBottomSheet: () => void;
  updateTitle: (payload: {linkId: string; title: string}) => void;
  linkId: number;
}

// 제목 수정 case
const TitleContent = ({
  defaultText,
  toggleBottomSheet,
  updateTitle,
  linkId,
}: TitleContentProps) => {
  const {t} = useTranslation();
  const [textInput, setTextInput] = useState<string | undefined>(defaultText);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isByteCountVisible, setIsByteCountVisible] = useState<boolean>(true);
  const [isReadyToSave, setIsReadyToSave] = useState<boolean>(!!defaultText);

  useEffect(() => {
    if (calculateByteLength(textInput) > 300) {
      setErrorMessage('');
      setIsByteCountVisible(true);
      setIsReadyToSave(false);
    } else {
      setErrorMessage('');
      setIsByteCountVisible(true);
      setIsReadyToSave(!!textInput);
    }
  }, [textInput]);

  const handleSave = () => {
    if (textInput) {
      updateTitle({linkId: String(linkId), title: textInput});
      toggleBottomSheet(); // 바텀 시트 닫기
    }
  };

  return (
    <>
      <View style={styles.contentContainer}>
        <TextInputGroup
          inputTitle={t('제목')}
          placeholder={t('제목을 입력해주세요.')}
          isUpdateTitle={true}
          {...{textInput, setTextInput, errorMessage, isByteCountVisible}}
        />
      </View>
      <CustomBottomButton
        title={t('저장')}
        onPress={handleSave}
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
