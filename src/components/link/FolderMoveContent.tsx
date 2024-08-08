import {useEffect, useState, useMemo} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import dummyFolderListRaw from '@/constants/dummy-data/dummy-folder-list.json';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {type FolderButtonProps} from '@/types/folder';
import {hasPressedFolder} from '@/utils/folder-utils';
import {AddIcon} from '@/assets/icons/common';
import {useBottomButtonSizeStore} from '@/store/useBottomButtonSizeStore';
import {type ITheme} from '@/types';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import FolderButton from '@/components/folder/FolderButton';
import BottomSheet from '@/components/modal/BottomSheet';
import FolderContent from '@/components/folder/FolderContent';

interface FolderMoveContentProps {
  toggleBottomSheet: () => void;
}

const FolderMoveContent = ({toggleBottomSheet}: FolderMoveContentProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [folderList, setFolderList] = useState<FolderButtonProps[]>(
    dummyFolderListRaw as FolderButtonProps[],
  );
  const [isReadyToSave, setIsReadyToSave] = useState<boolean>(true);
  const [isFolderBottomSheetVisible, setIsFolderBottomSheetVisible] =
    useState(false);
  const toggleFolderBottomSheet = () => {
    setIsFolderBottomSheetVisible(!isFolderBottomSheetVisible);
  };
  const {buttonHeight} = useBottomButtonSizeStore();

  useEffect(() => {
    setIsReadyToSave(hasPressedFolder(folderList));
  }, [folderList]);

  const handleToggleVariant = (id: number) => {
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
        <View style={styles.folderTitle}>
          <Text style={styles.folderTitleText}>폴더</Text>
          <TouchableOpacity
            style={styles.addContainer}
            onPress={toggleFolderBottomSheet}>
            <AddIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.folderList}>
          <FlatList
            data={folderList}
            renderItem={({item, index}) => (
              <>
                {index === 1 && <View style={styles.stroke}></View>}
                <FolderButton
                  id={item.id}
                  variants={item.variants}
                  name={item.name}
                  onPress={() => handleToggleVariant(item.id)}
                />
              </>
            )}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
      height: 540,
      paddingVertical: 12,
      marginBottom: 43,
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

export default FolderMoveContent;
