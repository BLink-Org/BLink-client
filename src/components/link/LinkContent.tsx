import React, {useEffect, useState, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import dummyFolderListRaw from '@/constants/dummy-data/dummy-link-list.json';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {isValidUrl} from '@/utils/url-utils';
import {type FolderButtonProps} from '@/types/folder';
import {AddIcon} from '@/assets/icons/common';
import {useBottomButtonSizeStore} from '@/store/useBottomButtonSizeStore';
import {type ITheme} from '@/types';
import TextInputGroup from '@/components/common/TextInputGroup';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import BottomSheet from '@/components/modal/BottomSheet';
import FolderContent from '@/components/folder/FolderContent';
import FolderList from '@/components/folder/FolderList';

interface FolderSideBarProps {
  defaultURL?: string;
  toggleBottomSheet: () => void;
}

const LinkContent = ({defaultURL, toggleBottomSheet}: FolderSideBarProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [textInput, setTextInput] = useState<string | undefined>(defaultURL);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedFolderId, setSelectedFolderId] = useState<number[] | null>([]);
  const [isReadyToSave, setIsReadyToSave] = useState<boolean>(!!defaultURL);
  const [isFolderBottomSheetVisible, setIsFolderBottomSheetVisible] =
    useState(false);
  const {buttonHeight} = useBottomButtonSizeStore();

  const folderList: FolderButtonProps[] =
    dummyFolderListRaw as FolderButtonProps[];

  const toggleFolderBottomSheet = () => {
    setIsFolderBottomSheetVisible(!isFolderBottomSheetVisible);
  };

  useEffect(() => {
    if (textInput && !isValidUrl(textInput)) {
      setErrorMessage('입력한 정보의 링크를 찾을 수 없습니다');
      setIsReadyToSave(false);
    } else {
      setErrorMessage('');
      setIsReadyToSave(
        !!textInput && !!selectedFolderId && selectedFolderId.length > 0,
      );
    }
  }, [textInput, selectedFolderId]);

  return (
    <>
      <BottomSheet
        modalTitle="폴더 생성"
        isBottomSheetVisible={isFolderBottomSheetVisible}
        toggleBottomSheet={toggleFolderBottomSheet}>
        <FolderContent
          toggleBottomSheet={() => {
            toggleFolderBottomSheet();
          }}
        />
      </BottomSheet>
      <SafeAreaView
        style={[styles.contentContainer, {marginBottom: buttonHeight}]}>
        <TextInputGroup
          inputTitle="링크"
          placeholder="www.example.co.kr"
          {...{textInput, setTextInput, errorMessage}}
        />
        <View style={styles.folderTitle}>
          <Text style={styles.folderTitleText}>폴더</Text>
          <TouchableOpacity
            style={styles.addContainer}
            onPress={toggleFolderBottomSheet}>
            <AddIcon stroke={theme.BACKGROUND} fill={theme.MAIN400} />
          </TouchableOpacity>
        </View>
        <FolderList
          folders={folderList}
          multipleSelection={true}
          selectedFolderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
        />
      </SafeAreaView>
      <CustomBottomButton
        title="저장"
        onPress={toggleBottomSheet}
        isDisabled={!isReadyToSave}
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
      marginBottom: 4,
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
    folderList: {
      flex: 1,
      paddingVertical: 12,
      marginBottom: 35,
    },
    stroke: {
      borderWidth: 1,
      borderColor: theme.TEXT200,
      marginBottom: 8,
      width: '100%',
    },
    separator: {
      height: 8,
    },
  });

export default LinkContent;
