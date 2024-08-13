import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import FolderButton from '@/components/folder/FolderButton';
import {useFolders} from '@/api/hooks/useFolder';

interface FolderListProps {
  isMultipleSelection: boolean; // 단일 선택(토글), 다중 선택
  // 선택된 폴더 아이디 (null: 전체 ... folders.length: 폴더 없는 링크)
  selectedFolderId: number[];
  setSelectedFolderId: React.Dispatch<React.SetStateAction<number[]>>;
  showToast?: (text: string) => void; // 폴더 사이드바용 showToast
  handleSelect?: (label: string, folderName?: string) => void; // 폴더  사이드바용 detail
  onFolderPress?: (selectedFolderIds: number[]) => void; // 홈 화면 - 폴더 선택 시 사이드바 closed
}

const FolderList = ({
  isMultipleSelection,
  selectedFolderId,
  setSelectedFolderId,
  showToast = () => {},
  handleSelect = () => {},
  onFolderPress = () => {},
}: FolderListProps) => {
  const {data: useFolderData} = useFolders();

  const addSelection = (folderId: number) => {
    setSelectedFolderId(prev => [
      ...(isMultipleSelection && !prev.includes(0) ? prev : []),
      folderId,
    ]);
  };

  const removeSelection = (folderId: number) => {
    setSelectedFolderId(prev =>
      isMultipleSelection && prev.length > 1
        ? prev.filter(id => id !== folderId)
        : [0],
    );
  };

  const handlePress = (folderId: number) => {
    selectedFolderId?.includes(folderId)
      ? removeSelection(folderId)
      : addSelection(folderId);

    onFolderPress(selectedFolderId);
  };

  return (
    <View>
      {useFolderData && (
        <FlatList
          data={useFolderData.folderDtos}
          renderItem={({item, index}) => (
            <FolderButton
              id={item.id}
              name={item.title}
              number={isMultipleSelection ? undefined : item.linkCount}
              variants={
                selectedFolderId?.includes(item.id) ? 'pressed' : 'default'
              }
              onPress={() => handlePress(item.id)}
              showToast={showToast}
              handleSelect={label => handleSelect(label, item.title)}
            />
          )}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
});

export default FolderList;
