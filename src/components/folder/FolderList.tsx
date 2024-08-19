import React, {useEffect, useMemo, useState} from 'react';
import {View, FlatList, StyleSheet, LayoutAnimation} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import FolderButton from '@/components/folder/FolderButton';
import {type ITheme, type GetFoldersSchema, type IFolderDtos} from '@/types';
import {useThemeStore} from '@/store/useThemeStore';
import {useMoveFolder} from '@/api/hooks/useFolder';

interface FolderListProps {
  isMultipleSelection: boolean; // 단일 선택(토글), 다중 선택
  // 선택된 폴더 아이디 (null: 전체 ... folders.length: 폴더 없는 링크)
  selectedFolderId: number[];
  setSelectedFolderId: React.Dispatch<React.SetStateAction<number[]>>;
  showToast?: (text: string) => void; // [사이드바] showToast
  handleSelect?: (folderData: IFolderDtos | null) => void; // [사이드바] detail 선택
  onFolderPress?: (selectedFolderIds: number[]) => void; // [사이드바] 사이드바 closed
  useFolderData?: GetFoldersSchema; // [api response] 폴더 데이터
}

const FolderList = ({
  isMultipleSelection,
  selectedFolderId,
  setSelectedFolderId,
  showToast = () => {},
  handleSelect = () => {},
  onFolderPress = () => {},
  useFolderData,
}: FolderListProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

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
        : [folderId],
    );
  };

  const handlePress = (folderId: number) => {
    selectedFolderId?.includes(folderId)
      ? removeSelection(folderId)
      : addSelection(folderId);

    onFolderPress(selectedFolderId);
  };

  const [, setFolders] = useState<IFolderDtos[]>(
    useFolderData?.folderDtos ?? [],
  );

  const queryClient = useQueryClient();
  const {mutate: moveFolderMutation} = useMoveFolder({
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['folders']}).then(() => {
        if (useFolderData?.folderDtos) {
          updateFolders(useFolderData.folderDtos);
        }
      });
    },
  });

  useEffect(() => {
    useFolderData && setFolders(useFolderData?.folderDtos);
  }, [useFolderData?.folderDtos]);

  const updateFolders = (newFolders: IFolderDtos[]) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFolders(newFolders);
  };

  const renderItem = ({item}: {item: IFolderDtos}) => (
    <FolderButton
      id={item.id}
      name={item.title}
      number={isMultipleSelection ? undefined : item.linkCount}
      variants={selectedFolderId?.includes(item.id) ? 'pressed' : 'default'}
      onPress={() => handlePress(item.id)}
      showToast={showToast}
      handleSelect={() => handleSelect(item)}
      onMoveUp={() => moveFolderMutation({folderId: item.id, direction: 'up'})}
      onMoveDown={() =>
        moveFolderMutation({folderId: item.id, direction: 'down'})
      }
    />
  );

  return (
    <>
      {useFolderData && (
        <FlatList
          data={useFolderData.folderDtos}
          renderItem={({item}) =>
            isMultipleSelection ? (
              <FolderButton
                id={item.id}
                name={item.title}
                number={isMultipleSelection ? undefined : item.linkCount}
                recent={item.recent}
                variants={
                  selectedFolderId?.includes(item.id) ? 'pressed' : 'default'
                }
                onPress={() => handlePress(item.id)}
                showToast={showToast}
                handleSelect={() => handleSelect(item)}
              />
            ) : (
              renderItem({item})
            )
          }
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            isMultipleSelection ? (
              <>
                <FolderButton
                  id={0}
                  variants={
                    selectedFolderId?.includes(0) ? 'pressed' : 'default'
                  }
                  onPress={() => setSelectedFolderId([0])}
                />
                <View style={styles.stroke}></View>
              </>
            ) : (
              <></>
            )
          }
          ListFooterComponent={
            !isMultipleSelection ? (
              <View style={styles.lastFolderView}>
                {useFolderData.noFolderLinkCount > 0 && (
                  <>
                    <View style={styles.stroke}></View>
                    <FolderButton
                      id={0}
                      number={useFolderData.noFolderLinkCount}
                      variants={
                        selectedFolderId?.includes(0) ? 'pressed' : 'default'
                      }
                      onPress={() => handlePress(0)}
                    />
                  </>
                )}
              </View>
            ) : (
              <></>
            )
          }
        />
      )}
    </>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    separator: {
      height: 8,
    },
    stroke: {
      borderWidth: 1,
      borderColor: theme.TEXT200,
      marginVertical: 8,
      width: '100%',
    },
    lastFolderView: {
      flex: 1,
    },
  });

export default FolderList;
