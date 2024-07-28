import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import dummyFolderListRaw from '@/constants/dummy-data/dummy-link-list.json';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {isValidUrl} from '@/utils/url-utils';
import {type FolderList} from '@/types/folder';
import {hasPressedFolder} from '@/utils/folder-utils';
import TextInputGroup from '../common/TextInputGroup';
import CustomBottomButton from '../common/CustomBottomButton';
import FolderButton from '../folder/FolderButton';

interface FolderSideBarProps {
  defaultURL?: string;
  toggleBottomSheet: () => void;
}

// 링크 생성 (컨텐츠 읽기 내 링크 저장 포함) case
const LinkContent = ({defaultURL, toggleBottomSheet}: FolderSideBarProps) => {
  const [textInput, setTextInput] = useState<string | undefined>(defaultURL);
  const [errorMessage, setErrorMessage] = useState<string>('');
  // TODO: Need to connect API & fix interface
  const [folderList, setFolderList] = useState<FolderList[]>(
    dummyFolderListRaw as FolderList[],
  );
  const [isReadyToSave, setIsReadyToSave] = useState<boolean>(!!defaultURL);
  const {theme} = useThemeStore();

  useEffect(() => {
    if (textInput && !isValidUrl(textInput)) {
      setErrorMessage('입력한 정보의 링크를 찾을 수 없습니다');
      setIsReadyToSave(false);
    } else {
      setErrorMessage('');
      setIsReadyToSave(!!textInput && hasPressedFolder(folderList));
    }
  }, [textInput, folderList]);

  const handleToggleVariant = (id: string) => {
    setFolderList(currentList =>
      currentList.map(folder =>
        folder.id === id
          ? {
              ...folder,
              variants: folder.variants === 'default' ? 'pressed' : 'default',
            }
          : folder,
      ),
    );
  };

  return (
    <>
      <View style={styles.contentContainer}>
        <TextInputGroup
          inputTitle="링크"
          placeholder="www.example.co.kr"
          {...{textInput, setTextInput, errorMessage}}
        />
        <Text
          style={[
            FONTS.BODY1_SEMIBOLD,
            {color: theme.MAIN500, marginTop: 32, marginBottom: 4},
          ]}>
          폴더
        </Text>
        <View style={styles.folderList}>
          <FlatList
            data={folderList}
            renderItem={({item, index}) => (
              <>
                {index === 1 && <View style={styles.stroke}></View>}
                <FolderButton
                  variants={item.variants}
                  name={item.name}
                  onPress={() => handleToggleVariant(item.id)}
                />
              </>
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
  folderList: {
    height: 400,
    paddingVertical: 12,
  },
  stroke: {
    borderWidth: 1,
    borderColor: '#ECF1F5',
    marginBottom: 8,
    width: '100%',
  },
  separator: {
    height: 8,
  },
});

export default LinkContent;
