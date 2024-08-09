import React, {useMemo} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import FolderButton from '@/components/folder/FolderButton';
import {type ITheme, type FolderButtonProps} from '@/types';
import {useThemeStore} from '@/store/useThemeStore';

interface FolderListProps {
  folders: FolderButtonProps[]; // 폴더 데이터
  multipleSelection: boolean; // 단일 선택(토글), 다중 선택
  // 선택된 폴더 아이디 (null: 전체 ... folders.length: 폴더 없는 링크)
  selectedFolderId: number[] | null;
  setSelectedFolderId: (v: number[] | null) => void;
  showToast?: (text: string) => void; // 폴더 사이드바용 showToast
  handleSelect?: (label: string, folderName?: string) => void; // 폴더  사이드바용 detail
  onFolderPress?: (selectedFolderIds: number[] | null) => void; // 홈 화면 - 폴더 선택 시 사이드바 closed
}

const FolderList = ({
  folders,
  multipleSelection,
  selectedFolderId,
  setSelectedFolderId,
  showToast = () => {},
  handleSelect = () => {},
  onFolderPress = () => {},
}: FolderListProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handlePress = (folderId: number | null) => {
    let updatedSelected: number[] | null;

    if (!folderId) {
      setSelectedFolderId(null);
      onFolderPress(null);
      return;
    }

    if (multipleSelection) {
      if (!selectedFolderId) {
        updatedSelected = [folderId];
      } else {
        updatedSelected = selectedFolderId.includes(folderId)
          ? selectedFolderId.filter(id => id !== folderId)
          : [...selectedFolderId, folderId];
      }
    } else {
      updatedSelected = selectedFolderId?.includes(folderId)
        ? null
        : [folderId];
    }

    setSelectedFolderId(updatedSelected);
    onFolderPress(updatedSelected);
  };

  return (
    <View style={styles.folderList}>
      <FlatList
        data={folders}
        renderItem={({item, index}) => (
          <>
            {folders.length - 1 === index && (
              <View style={styles.stroke}></View>
            )}
            <FolderButton
              id={item.id}
              name={item.name}
              number={multipleSelection ? undefined : item.number}
              variants={
                selectedFolderId?.includes(item.id) ? 'pressed' : 'default'
              }
              onPress={() => handlePress(item.id)}
              showToast={showToast}
              handleSelect={label => handleSelect(label, item.name)}
            />
          </>
        )}
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
      {/* {multipleSelection && (
        <FolderButton
          id={folders.length}
          variants={selectedFolderId ? 'default' : 'pressed'}
          onPress={() => handlePress(null)}
        />
      )} */}
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    folderList: {
      flex: 1,
      maxHeight: 517,
      paddingVertical: 20,
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

export default FolderList;
