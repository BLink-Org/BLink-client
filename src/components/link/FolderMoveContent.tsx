import React, {useEffect, useState, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {AddIcon} from '@/assets/icons/common';
import {useBottomButtonSizeStore} from '@/store/useBottomButtonSizeStore';
import {type ITheme} from '@/types';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import BottomSheet from '@/components/modal/BottomSheet';
import FolderContent from '@/components/folder/FolderContent';
import FolderList from '@/components/folder/FolderList';
import {useFolders} from '@/api/hooks/useFolder';
import FolderButton from '../folder/FolderButton';

interface FolderMoveContentProps {
  toggleBottomSheet: () => void;
}

const FolderMoveContent = ({toggleBottomSheet}: FolderMoveContentProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {data: useFolderData} = useFolders();

  const [selectedFolderId, setSelectedFolderId] = useState<number[]>([]);
  const [isReadyToSave, setIsReadyToSave] = useState<boolean>(true);
  const [isFolderBottomSheetVisible, setIsFolderBottomSheetVisible] =
    useState(false);
  const {buttonHeight} = useBottomButtonSizeStore();

  const toggleFolderBottomSheet = () => {
    setIsFolderBottomSheetVisible(!isFolderBottomSheetVisible);
  };

  useEffect(() => {
    setIsReadyToSave(!!selectedFolderId && selectedFolderId.length > 0);
  }, [selectedFolderId]);

  return (
    <>
      <BottomSheet
        modalTitle="폴더 생성"
        isBottomSheetVisible={isFolderBottomSheetVisible}
        toggleBottomSheet={toggleFolderBottomSheet}>
        <FolderContent toggleBottomSheet={toggleFolderBottomSheet} />
      </BottomSheet>
      <SafeAreaView
        style={[styles.contentContainer, {marginBottom: buttonHeight}]}>
        <View style={styles.folderTitle}>
          <Text style={styles.folderTitleText}>폴더</Text>
          <TouchableOpacity
            style={styles.addContainer}
            onPress={toggleFolderBottomSheet}>
            <AddIcon stroke={theme.BACKGROUND} fill={theme.MAIN400} />
          </TouchableOpacity>
        </View>
        <View style={styles.folderView}>
          <FolderList
            isMultipleSelection={true}
            {...{selectedFolderId, setSelectedFolderId, useFolderData}}
          />
          <View style={styles.stroke}></View>
          <View style={styles.lastFolderview}>
            <FolderButton
              id={0}
              variants={selectedFolderId?.includes(0) ? 'pressed' : 'default'}
              onPress={() => setSelectedFolderId([0])}
            />
          </View>
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
    folderView: {
      flex: 1,
      paddingVertical: 12,
      marginBottom: 35,
    },
    lastFolderview: {
      flex: 1,
    },
    stroke: {
      borderWidth: 1,
      borderColor: theme.TEXT200,
      marginVertical: 8,
      width: '100%',
    },
  });

export default FolderMoveContent;
