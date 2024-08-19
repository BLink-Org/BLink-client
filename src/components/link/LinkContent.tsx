import {useEffect, useState, useMemo, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import Clipboard from '@react-native-clipboard/clipboard';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {AddIcon, DeleteIcon} from '@/assets/icons/common';
import {useBottomButtonSizeStore} from '@/store/useBottomButtonSizeStore';
import {type ITheme} from '@/types';
import TextInputGroup from '@/components/common/TextInputGroup';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import BottomSheet from '@/components/modal/BottomSheet';
import FolderContent from '@/components/folder/FolderContent';
import FolderList from '@/components/folder/FolderList';
import {useCreateFolder, useFolders} from '@/api/hooks/useFolder';
import {useCreateLink} from '@/api/hooks/useLink';
import {trackEvent} from '@/utils/amplitude-utils';
import FolderButtonPlaceHolder from '../folder/FolderButtonPlaceHolder';

interface FolderSideBarProps {
  defaultURL?: string;
  toggleBottomSheet: () => void;
}

const LinkContent = ({defaultURL, toggleBottomSheet}: FolderSideBarProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {t} = useTranslation();
  const {data: useFolderData, isLoading} = useFolders();

  const [textInput, setTextInput] = useState<string | undefined>(defaultURL);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedFolderId, setSelectedFolderId] = useState<number[]>([0]);
  const [isReadyToSave, setIsReadyToSave] = useState<boolean>(!!defaultURL);
  const [isFolderBottomSheetVisible, setIsFolderBottomSheetVisible] =
    useState(false);
  const {buttonHeight} = useBottomButtonSizeStore();

  const useReRenderer = () => {
    const [, setState] = useState(false);
    return useCallback(() => {
      setState(prev => !prev);
    }, []);
  };

  // 중복호출을 막기 위해 Ref 사용
  const isSavingRef = useRef(false);
  const reRender = useReRenderer();

  const [clipboardContent, setClipboardContent] = useState('');
  const [isClipboardShown, setIsClipboardShown] = useState<boolean>(false);

  useEffect(() => {
    const fetchClipboardContent = async () => {
      const content = await Clipboard.getString();
      const urlPattern = /^(www\.|https?:\/\/)/;
      const regexResult = urlPattern.test(content);
      if (regexResult && content !== clipboardContent) {
        setClipboardContent(regexResult ? content : '');
        setIsClipboardShown(true);
      }
    };

    fetchClipboardContent();
  });

  // 링크 저장 모달 내 폴더 생성 API
  const queryClient = useQueryClient();
  const {mutate: createFolder} = useCreateFolder({
    onSuccess: () => {
      toggleFolderBottomSheet();
      queryClient.invalidateQueries({queryKey: ['folders']});
    },
  });

  const {mutate: createLink} = useCreateLink({
    onSuccess: () => {
      toggleBottomSheet();
      queryClient.invalidateQueries({queryKey: ['folders']});
      queryClient.invalidateQueries({queryKey: ['links']});
    },
    onError: (error: any) => {
      if (error.response.data.code === 2600) {
        setErrorMessage(t('이미 저장된 링크입니다.'));
        setIsReadyToSave(false);
      } else if (error.response.data.code === 2601) {
        setErrorMessage(t('입력한 링크를 찾을 수 없습니다.'));
        setIsReadyToSave(false);
      } else if (error.response.data.code === 2607) {
        setErrorMessage(t('이미 휴지통에 존재 하는 링크 url입니다.'));
        setIsReadyToSave(false);
      } else {
        setErrorMessage(t('링크 저장에 실패했습니다.'));
        setIsReadyToSave(false);
      }
    },
  });

  const handlePress = () => {
    if (isSavingRef.current) {
      return;
    }
    isSavingRef.current = true;
    reRender();
    if (textInput) {
      createLink({
        url: textInput,
        folderIdList: selectedFolderId[0] === 0 ? [] : selectedFolderId,
      });
    }
  };

  const onSaveFolder = (textInput: string) => {
    createFolder({title: textInput});
    trackEvent('Folder_Creation', {location: 'in-gnb-save-link'});
  };

  const toggleFolderBottomSheet = () => {
    setIsFolderBottomSheetVisible(!isFolderBottomSheetVisible);
  };

  useEffect(() => {
    setTextInput(defaultURL);
  }, [defaultURL]);

  useEffect(() => {
    if (textInput && selectedFolderId) {
      setErrorMessage('');
      setIsReadyToSave(
        !!textInput && !!selectedFolderId && selectedFolderId.length > 0,
      );
    }
  }, [textInput, selectedFolderId]);

  return (
    <>
      <BottomSheet
        modalTitle={t('폴더 생성')}
        isBottomSheetVisible={isFolderBottomSheetVisible}
        toggleBottomSheet={toggleFolderBottomSheet}>
        <FolderContent
          folderTitles={
            useFolderData?.folderDtos.map(folder => folder.title) ?? []
          }
          {...{onSaveFolder}}
        />
      </BottomSheet>
      <SafeAreaView
        style={[styles.contentContainer, {marginBottom: buttonHeight}]}>
        {isClipboardShown && (
          <View style={styles.clipboardContainer}>
            <View style={styles.horizontalContainer}>
              <Text style={styles.clipboardTitle}>
                {t('클립보드에 복사된 링크가 있어요.')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsClipboardShown(false);
                  // 이벤트 추적
                  trackEvent('Link_Easy_Paste_Cancel');
                }}>
                <DeleteIcon fill={theme.TEXT600} width={20} height={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.pasteContainer}>
              <View>
                <Text
                  style={styles.clipboardContent}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {clipboardContent}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.paste}
                onPress={() => {
                  setTextInput(clipboardContent);
                  setIsClipboardShown(false);
                  // 이벤트 추적
                  trackEvent('Link_Easy_Paste_Usage');
                }}>
                <Text style={styles.pasteText}>{t('붙여넣기')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <TextInputGroup
          inputTitle={t('링크')}
          placeholder={t('링크를 입력해주세요.')}
          handleFocus={() => setIsClipboardShown(false)}
          {...{textInput, setTextInput, errorMessage}}
        />
        <View style={styles.folderTitle}>
          <Text style={styles.folderTitleText}>{t('폴더')}</Text>
          <TouchableOpacity
            style={styles.addContainer}
            onPress={toggleFolderBottomSheet}>
            <AddIcon stroke={theme.BACKGROUND} fill={theme.MAIN400} />
          </TouchableOpacity>
        </View>
        <View style={styles.folderView}>
          {isLoading ? (
            <FolderButtonPlaceHolder isMultipleSelection />
          ) : (
            <FolderList
              isMultipleSelection={true}
              {...{selectedFolderId, setSelectedFolderId, useFolderData}}
            />
          )}
        </View>
      </SafeAreaView>
      <CustomBottomButton
        title={t('저장')}
        onPress={handlePress}
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
    clipboardContainer: {
      position: 'absolute',
      top: 136,
      left: 18,
      right: 18,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: theme.MAIN100,
      paddingVertical: 16,
      paddingHorizontal: 16,
      gap: 8,
      zIndex: 5,
      shadowColor: 'rgba(0, 0, 0, 0.12)',
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 5,
    },
    horizontalContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    clipboardTitle: {
      color: theme.TEXT800,
      ...FONTS.BODY1_SEMIBOLD,
      flex: 1,
      justifyContent: 'flex-start',
    },
    clipboardContent: {
      color: theme.TEXT400,
      ...FONTS.BODY2_SEMIBOLD,
    },
    pasteContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      marginHorizontal: 38,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    paste: {
      paddingVertical: 6,
      paddingHorizontal: 16,
      backgroundColor: theme.BACKGROUND,
      borderRadius: 100,
      marginLeft: 8,
    },
    pasteText: {
      color: theme.MAIN500,
      ...FONTS.BODY2_SEMIBOLD,
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
    folderView: {
      flex: 1,
      paddingVertical: 12,
      marginBottom: 35,
    },
    stroke: {
      borderWidth: 1,
      borderColor: theme.TEXT200,
      marginVertical: 8,
      width: '100%',
    },
  });

export default LinkContent;
