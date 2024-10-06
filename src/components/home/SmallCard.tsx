import {useState, useMemo, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  type TextLayoutEventData,
  type NativeSyntheticEvent,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useThemeStore} from '@/store/useThemeStore';
import {PinnedSelectedIcon, PinnedUnselectedIcon} from '@/assets/icons/common';
import {FONTS} from '@/constants';
import {MoveIcon, ShareIcon, ThreeDotIcon} from '@/assets/icons/home';
import {DeleteIcon, PencilIcon} from '@/assets/icons/mypage';
import DropDownModal from '@/components/modal/DropDownModal';
import {useModalStore} from '@/store/useModalStore';
import AlertModal from '@/components/modal/AlertModal';
import {type UseLinkInfoArgs, type ILinkDtos, type ITheme} from '@/types';
import BottomSheet from '@/components/modal/BottomSheet';
import TitleContent from '@/components/link/TitleContent';
import FolderMoveContent from '@/components/link/FolderMoveContent';
import {TOAST_MESSAGE} from '@/constants/toast';
import {
  useDeleteLink,
  useMoveBookmarkLinkToTrash,
  useMoveLinkToTrash,
  useMoveSearchLinkToTrash,
  useRecoverLink,
  useToggleBookmarkLinkPin,
  useToggleLinkPin,
  useToggleSearchLinkPin,
  useUpdateBookmarkLinkTitle,
  useUpdateLinkTitle,
  useUpdateSearchLinkTitle,
} from '@/api/hooks/useLink';
import {extractHostname, shareUrl} from '@/utils/url-utils';
import {trackEvent} from '@/utils/amplitude-utils';

interface SmallCardProps {
  content: ILinkDtos;
  page?: string;
  showToast?: (text: string) => void;
  linkInfoArgs: UseLinkInfoArgs;
}

const SmallCard = ({
  content,
  page,
  showToast = () => {},
  linkInfoArgs,
}: SmallCardProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {showModal, closeModal} = useModalStore();
  const {t} = useTranslation();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 휴지통에서 영구삭제
  const {mutate: deleteLink} = useDeleteLink(linkInfoArgs);
  // 휴지통에서 복원
  const {mutate: recoverLink} = useRecoverLink(linkInfoArgs);

  // 휴지통으로 이동
  const {mutate: moveLinkToTrash} =
    page === 'search'
      ? useMoveSearchLinkToTrash(linkInfoArgs)
      : page === 'bookmark'
        ? useMoveBookmarkLinkToTrash(linkInfoArgs)
        : useMoveLinkToTrash(linkInfoArgs);

  // 링크 제목 수정
  const {mutate: updateTitle} =
    page === 'search'
      ? useUpdateSearchLinkTitle(linkInfoArgs)
      : page === 'bookmark'
        ? useUpdateBookmarkLinkTitle(linkInfoArgs)
        : useUpdateLinkTitle(linkInfoArgs);

  // 핀 on/off
  const {mutate: togglePin} =
    page === 'search'
      ? useToggleSearchLinkPin(linkInfoArgs)
      : page === 'bookmark'
        ? useToggleBookmarkLinkPin(linkInfoArgs)
        : useToggleLinkPin(linkInfoArgs);

  const CardImage = useMemo(() => {
    return theme.SMALL_CARD_IMAGE;
  }, [theme]);

  // 제목 수정 바텀시트 모달 관리
  const [isTitleBottomSheetVisible, setIsTitleBottomSheetVisible] =
    useState(false);
  const toggleTitleBottomSheet = () => {
    setIsTitleBottomSheetVisible(!isTitleBottomSheetVisible);
  };
  const handleTitleUpdate = () => {
    setIsTitleBottomSheetVisible(!isTitleBottomSheetVisible);
    trackEvent('Link_Title_Edited', {
      Link_ID: content.id,
    });
  };

  // 폴더 이동 바텀시트 모달 관리
  const [isFolderBottomSheetVisible, setIsFolderBottomSheetVisible] =
    useState(false);
  const toggleFolderBottomSheet = () => {
    setIsFolderBottomSheetVisible(!isFolderBottomSheetVisible);
  };

  // 드롭다운 모달 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeDropdown = () => setIsDropdownOpen(false);

  const [anchorPosition, setAnchorPosition] = useState({x: 0, y: 0});
  const buttonRef = useRef<TouchableOpacity>(null);

  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setIsDropdownOpen(true);
        setAnchorPosition({x: pageX, y: pageY + height});
      });
      setSelectedId(content.id);
    } else {
      setIsDropdownOpen(false);
    }
  };

  // 핀 on/off
  const handlePinToggle = () => {
    togglePin(String(content.id));
    if (!content.pinned) {
      trackEvent('Pin_Saved', {Link_Saved_Location: 'at-card'});
    } else {
      trackEvent('Pin_Unpinned', {Link_Saved_Location: 'at-card'});
    }
  };

  const getModalId = (baseId: string) => `${baseId}-${selectedId}`;

  const handleSelect = (label: string) => {
    const modalId = getModalId(`trashOption-${label}`);
    showModal(modalId);
  };

  const handleConfirmSelect = (label: string) => {
    const modalId = getModalId(`trashOption-${label}`);
    if (label === '영구삭제') {
      deleteLink(String(selectedId));
      trackEvent('Link_Permanent_Deleted', {
        Link_ID: content.id,
      });
    }
    if (label === '복원') {
      recoverLink(String(selectedId));
      trackEvent('Link_Restored', {
        Link_ID: content.id,
      });
    }
    closeModal(modalId);
  };

  const editOptions = useMemo(
    () => [
      {
        label: t('제목 수정'),
        icon: <PencilIcon />,
        onSelect: () => {
          closeDropdown();
          toggleTitleBottomSheet();
        },
      },
      {
        label: t('폴더 이동'),
        icon: <MoveIcon />,
        onSelect: () => {
          closeDropdown();
          toggleFolderBottomSheet();
        },
      },
      {
        label: t('공유'),
        icon: <ShareIcon />,
        onSelect: () => {
          const currentUrl = content.url ?? '';
          shareUrl(currentUrl);
          trackEvent('Click_Share', {Link_Saved_Location: 'at-card'});
        },
      },

      {
        label: t('삭제'),
        icon: <DeleteIcon />,
        onSelect: () => {
          moveLinkToTrash(String(content.id));
          showToast(t(TOAST_MESSAGE.DELETE_SUCCESS));
          closeDropdown();
          trackEvent('Link_Deleted', {
            Link_ID: content.id,
          });
        },
      },
    ],
    [closeDropdown, toggleTitleBottomSheet, toggleFolderBottomSheet],
  );

  const trashOptions = useMemo(
    () => [
      {
        label: t('복원'),
        icon: <PencilIcon />,
        onSelect: () => {
          closeDropdown();
          handleSelect('복원');
        },
      },
      {
        label: t('영구삭제'),
        icon: <DeleteIcon />,
        onSelect: () => {
          closeDropdown();
          handleSelect('영구삭제');
        },
      },
    ],
    [closeDropdown, handleSelect],
  );

  // 이미지 로딩 처리
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const handleImageLoad = () => {
    setImageLoading(false);
  };
  const LoadingScreen = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#6D96FF" />
      </View>
    );
  };

  // 제목 라인 수에 따라 본문 라인 수 조절
  const [contentLines, setContentLines] = useState(1);

  const handleTitleLayout = (
    event: NativeSyntheticEvent<TextLayoutEventData>,
  ) => {
    const lineCount = event.nativeEvent.lines.length;
    if (lineCount === 1) {
      setContentLines(2);
    } else {
      setContentLines(1);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.dotPosition}>
          <Text style={styles.folderText}>
            {content?.folderName ?? t('폴더 없는 링크')}
          </Text>

          <TouchableOpacity
            ref={buttonRef}
            onPress={toggleDropdown}
            style={styles.dotButton}>
            <ThreeDotIcon fill={theme.TEXT300} />
          </TouchableOpacity>
          {isDropdownOpen && (
            <DropDownModal
              isVisible={isDropdownOpen}
              options={page === 'trash' ? trashOptions : editOptions}
              onClose={closeDropdown}
              anchorPosition={anchorPosition}
            />
          )}
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text
              style={styles.titleText}
              numberOfLines={2}
              ellipsizeMode="tail"
              onTextLayout={handleTitleLayout}>
              {content?.title === ''
                ? t('제목이 없는 링크입니다.', {
                    domain: extractHostname(content.url ?? ''),
                  })
                : content.title}
            </Text>
            <View style={styles.descriptionTop} />
            <Text
              style={styles.descriptionText}
              numberOfLines={contentLines}
              ellipsizeMode="tail">
              {content?.contents === '' ? '' : content.contents}
            </Text>
          </View>
          <View style={styles.cardImageContainer}>
            {content.imageUrl && imageLoading && <LoadingScreen />}
            {content.imageUrl ? (
              <Image
                source={{uri: content.imageUrl}}
                style={styles.image}
                onLoad={handleImageLoad}
                onError={handleImageLoad}
              />
            ) : (
              <CardImage width={84} height={84} />
            )}
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerFront}>
            <Text style={styles.footerText}>{content.createdAt}</Text>
            <Text style={styles.footerText}>
              {extractHostname(content.url ?? '')}
            </Text>
          </View>
          {!(page === 'trash') ? (
            <TouchableOpacity
              onPress={handlePinToggle}
              style={styles.pinButton}>
              {content.pinned ? (
                <PinnedSelectedIcon
                  width={24}
                  height={24}
                  fill={theme.MAIN400}
                  stroke={theme.MAIN400}
                />
              ) : (
                <PinnedUnselectedIcon
                  width={24}
                  height={24}
                  stroke={theme.TEXT400}
                />
              )}
            </TouchableOpacity>
          ) : null}
        </View>

        {/* alertModal 처리 */}
        <AlertModal
          modalId={getModalId('trashOption-복원')}
          headerText={t('링크를 복원하시겠어요?')}
          bodyText={t('마지막에 저장되어있던 위치로 돌아가요.')}
          leftText={t('취소')}
          rightText={t('복원')}
          rightOnPress={() => handleConfirmSelect('복원')}
        />

        <AlertModal
          modalId={getModalId('trashOption-영구삭제')}
          headerText={t('영구 삭제 하시겠어요?')}
          bodyText={t('휴지통에서 삭제된 링크는 복원할 수 없어요')}
          leftText={t('취소')}
          rightText={t('삭제')}
          rightOnPress={() => handleConfirmSelect('영구삭제')}
        />
      </View>
      <BottomSheet
        modalTitle={t('제목 수정')}
        isBottomSheetVisible={isTitleBottomSheetVisible}
        toggleBottomSheet={toggleTitleBottomSheet}>
        <TitleContent
          defaultText={content.title}
          toggleBottomSheet={handleTitleUpdate}
          updateTitle={updateTitle}
          linkId={content.id}
        />
      </BottomSheet>
      <BottomSheet
        modalTitle={t('폴더 이동')}
        isBottomSheetVisible={isFolderBottomSheetVisible}
        toggleBottomSheet={toggleFolderBottomSheet}>
        <FolderMoveContent
          toggleBottomSheet={toggleFolderBottomSheet}
          linkId={content.id}
        />
      </BottomSheet>
    </>
  );
};

export default SmallCard;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: 180,
      paddingVertical: 20,
      gap: 8,
      
    },
    dotPosition: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    mainContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 24,
    },
    textContainer: {
      flexShrink: 1,
    },
    descriptionTop: {
      height: 8,
    },
    dotButton: {
      marginHorizontal: -16,
      paddingHorizontal: 16,
    },
    pinButton: {
      paddingLeft: 5,
    },
    cardImageContainer: {
      width: 84,
      height: 84,
      borderRadius: 8,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    footerFront: {
      flexDirection: 'row',
      gap: 12,
    },
    folderText: {
      color: theme.TEXT600,
      ...FONTS.BODY3_MEDIUM,
    },
    titleText: {
      color: theme.TEXT900,
      ...FONTS.BODY1_MEDIUM,
    },
    descriptionText: {
      color: theme.TEXT500,
      ...FONTS.BODY2_REGULAR,
    },
    footerText: {
      color: theme.TEXT500,
      ...FONTS.CAPTION_REGULAR,
    },
  });
