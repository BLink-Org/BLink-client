import {useEffect, useRef, useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal as RNModal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {BackIcon, ForwardIcon} from '@/assets/icons/modal';
import {AddIcon} from '@/assets/icons/common';
import {type FolderButtonProps, type ITheme} from '@/types';
import BottomSheet from '@/components/modal/BottomSheet';
import FolderContent from '@/components/folder/FolderContent';
import useToast from '@/hooks/useToast';
import {TOAST_MESSAGE} from '@/constants/toast';
import dummyFolderListRaw from '@/constants/dummy-data/dummy-folder-list.json';
import FolderList from '../folder/FolderList';

interface FolderSideBarProps {
  isSideBarVisible: boolean;
  toggleSideBar: () => void;
  selectedFolderId: number[] | null;
  setSelectedFolderId: (v: number[] | null) => void;
}

const FolderSideBar = ({
  isSideBarVisible,
  toggleSideBar,
  selectedFolderId,
  setSelectedFolderId,
}: FolderSideBarProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const insets = useSafeAreaInsets();
  const {Toast, showToast} = useToast({
    marginBottom: 128,
  });

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [folderToEdit, setFolderToEdit] = useState<string | null>(null);

  const handleSelect = (label: string, folderName?: string) => {
    switch (label) {
      case '폴더명 수정':
        toggleBottomSheet(folderName);
        break;
      default:
    }
  };

  const [visible, setVisible] = useState(isSideBarVisible);

  const animation = useRef(
    new Animated.Value(-Dimensions.get('window').width),
  ).current;

  const toggleBottomSheet = (folderName: string | null = null) => {
    setFolderToEdit(folderName);
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };

  useEffect(() => {
    if (isSideBarVisible) {
      setVisible(true);
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: -Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    }
  }, [isSideBarVisible]);

  return (
    <RNModal
      visible={visible}
      onRequestClose={toggleSideBar}
      transparent
      animationType="none"
      hardwareAccelerated
      presentationStyle="overFullScreen"
      style={styles.modalContent}>
      <TouchableWithoutFeedback onPress={toggleSideBar}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.modalContent,
          {
            transform: [{translateX: animation}],
            paddingTop: insets.top,
          },
        ]}>
        <TouchableOpacity onPress={toggleSideBar} style={styles.closeButton}>
          <BackIcon width={26} height={26} fill={theme.TEXT900} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>폴더</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.linkCount}>123 Links</Text>
          <TouchableOpacity
            style={styles.totalButton}
            onPress={() => {
              setSelectedFolderId(null);
              toggleSideBar();
            }}>
            <Text style={styles.totalButtonText}>전체보기</Text>
            <ForwardIcon />
          </TouchableOpacity>
        </View>

        <FolderList
          folders={dummyFolderListRaw as FolderButtonProps[]}
          multipleSelection={false}
          onFolderPress={toggleSideBar}
          {...{selectedFolderId, setSelectedFolderId, handleSelect, showToast}}
        />

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.addFolderButton}
            onPress={() => {
              toggleBottomSheet();
            }}>
            <AddIcon style={{marginRight: 8}} />
            <Text style={styles.addFolderButtonText}>폴더 생성</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Toast />
      <BottomSheet
        modalTitle={folderToEdit ? '폴더 수정' : '폴더 생성'}
        {...{isBottomSheetVisible, toggleBottomSheet}}>
        <FolderContent
          defaultText={folderToEdit ?? undefined}
          toggleBottomSheet={() => {
            toggleBottomSheet(folderToEdit);
            showToast(
              folderToEdit
                ? TOAST_MESSAGE.EDIT_SUCCESS
                : TOAST_MESSAGE.CREATE_SUCCESS,
            );
          }}
        />
      </BottomSheet>
    </RNModal>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
    },
    modalContent: {
      backgroundColor: theme.BACKGROUND,
      borderTopRightRadius: 28,
      borderBottomRightRadius: 28,
      width: 316,
      height: '100%',
      padding: 18,
      position: 'absolute',
      left: 0,
      top: 0,
      shadowColor: '#000',
      shadowOffset: {width: 15, height: 0},
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 5,
    },
    titleContainer: {
      height: 69,
      justifyContent: 'center',
    },
    title: {
      color: theme.TEXT900,
      ...FONTS.TITLE,
    },
    detailContainer: {
      height: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    linkCount: {
      color: theme.MAIN500,
      ...FONTS.BODY2_MEDIUM,
    },
    totalButton: {
      width: 70,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    totalButtonText: {
      color: theme.TEXT700,
      ...FONTS.BODY2_MEDIUM,
    },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingBottom: 22,
    },
    addFolderButton: {
      height: 45,
      borderWidth: 1,
      borderColor: '#ECF1F5',
      borderRadius: 100,
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    addFolderButtonText: {
      color: theme.TEXT700,
      ...FONTS.BODY2_SEMIBOLD,
    },
    closeButton: {
      height: 58,
      justifyContent: 'center',
    },
  });

export default FolderSideBar;
