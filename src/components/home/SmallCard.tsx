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
  useMoveLinkToTrash,
  useRecoverLink,
} from '@/api/hooks/useLink';
import {extractHostname, shareUrl} from '@/utils/url-utils';

interface SmallCardProps {
  content: ILinkDtos;
  isTrash?: boolean;
  showToast?: (text: string) => void;
  linkInfoArgs: UseLinkInfoArgs;
}

const SmallCard = ({
  content,
  isTrash,
  showToast = () => {},
  linkInfoArgs,
}: SmallCardProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {showModal, closeModal} = useModalStore();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 휴지통으로 이동
  const {mutate: moveLinkToTrash} = useMoveLinkToTrash(linkInfoArgs);
  // 휴지통에서 영구삭제
  const {mutate: deleteLink} = useDeleteLink(linkInfoArgs);
  // 휴지통에서 복원
  const {mutate: recoverLink} = useRecoverLink(linkInfoArgs);

  const CardImage = useMemo(() => {
    return theme.SMALL_CARD_IMAGE;
  }, [theme]);

  // 제목 수정 바텀시트 모달 관리
  const [isTitleBottomSheetVisible, setIsTitleBottomSheetVisible] =
    useState(false);
  const toggleTitleBottomSheet = () => {
    setIsTitleBottomSheetVisible(!isTitleBottomSheetVisible);
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
      setSelectedId(content.id); // 모달이 열릴 때만 설정
    } else {
      setIsDropdownOpen(false);
      // 모달이 닫힐 때는 selectedId를 변경하지 않음
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
    }
    if (label === '복원') {
      recoverLink(String(selectedId));
    }
    closeModal(modalId);
  };

  const editOptions = useMemo(
    () => [
      {
        label: '제목 수정',
        icon: <PencilIcon />,
        onSelect: () => {
          closeDropdown();
          toggleTitleBottomSheet();
        },
      },
      {
        label: '폴더 이동',
        icon: <MoveIcon />,
        onSelect: () => {
          closeDropdown();
          toggleFolderBottomSheet();
        },
      },
      {
        label: '공유',
        icon: <ShareIcon />,
        onSelect: () => {
          const currentUrl = content.url ?? '';
          shareUrl(currentUrl);
        },
      },

      {
        label: '삭제',
        icon: <DeleteIcon />,
        onSelect: () => {
          moveLinkToTrash(String(content.id));
          showToast(TOAST_MESSAGE.DELETE_SUCCESS);
          closeDropdown();
        },
      },
    ],
    [closeDropdown, toggleTitleBottomSheet, toggleFolderBottomSheet],
  );

  const trashOptions = useMemo(
    () => [
      {
        label: '복원',
        icon: <PencilIcon />,
        onSelect: () => {
          closeDropdown();
          handleSelect('복원');
        },
      },
      {
        label: '영구삭제',
        icon: <DeleteIcon />,
        onSelect: () => {
          closeDropdown();
          handleSelect('영구삭제');
        },
      },
    ],
    [closeDropdown, handleSelect],
  );

  // 북마크 토글 상태 관리
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // 이미지 로딩 처리
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const handleImageLoad = () => {
    setImageLoading(false);
  };
  const LoadingScreen = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={theme.MAIN500} />
      </View>
    );
  };

  // 제목 라인 수에 따라 본문 라인 수 조절
  const [contentLines, setContentLines] = useState(1);
  const handleTitleLayout = (
    event: NativeSyntheticEvent<TextLayoutEventData>,
  ) => {
    const lineCount = event.nativeEvent.lines.length;
    if (lineCount === 2) {
      setContentLines(1);
    }
  };

  <Text>text contents</Text>;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.dotPosition}>
          <Text style={styles.folderText}>
            {content.folderName ?? '폴더 없이 저장'}
          </Text>
          <TouchableOpacity ref={buttonRef} onPress={toggleDropdown}>
            <ThreeDotIcon fill={theme.TEXT300} />
          </TouchableOpacity>
          {isDropdownOpen && (
            <DropDownModal
              isVisible={isDropdownOpen}
              options={isTrash ? trashOptions : editOptions}
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
              {content.title === '' ? '제목 없음' : content.title}
            </Text>
            <View style={styles.descriptionTop} />
            <Text
              style={styles.descriptionText}
              numberOfLines={contentLines}
              ellipsizeMode="tail">
              {content.contents === '' ? '내용 없음' : content.contents}
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
              <CardImage width={76} height={76} />
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
          {!isTrash ? (
            <TouchableOpacity onPress={toggleBookmark}>
              {isBookmarked ? (
                <PinnedSelectedIcon
                  width={20}
                  height={20}
                  fill={theme.MAIN400}
                  stroke={theme.MAIN400}
                />
              ) : (
                <PinnedUnselectedIcon
                  width={20}
                  height={20}
                  stroke={theme.TEXT400}
                />
              )}
            </TouchableOpacity>
          ) : null}
        </View>

        {/* alertModal 처리 */}
        <AlertModal
          modalId={getModalId('trashOption-복원')}
          headerText={`링크를 복원하시겠어요?`}
          bodyText={'마지막에 저장되어있던 위치로 돌아가요'}
          leftText="취소"
          rightText="복원"
          rightOnPress={() => handleConfirmSelect('복원')}
        />
        <AlertModal
          modalId={getModalId('trashOption-영구삭제')}
          headerText={`영구 삭제 하시겠어요? `}
          bodyText={`휴지통에서 삭제된 링크는 복원할 수 없어요`}
          leftText="취소"
          rightText="삭제"
          rightOnPress={() => handleConfirmSelect('영구삭제')}
        />
      </View>
      <BottomSheet
        modalTitle="제목 수정"
        isBottomSheetVisible={isTitleBottomSheetVisible}
        toggleBottomSheet={toggleTitleBottomSheet}>
        <TitleContent
          defaultText={content.title}
          toggleBottomSheet={toggleTitleBottomSheet}
        />
      </BottomSheet>
      <BottomSheet
        modalTitle="폴더 이동"
        isBottomSheetVisible={isFolderBottomSheetVisible}
        toggleBottomSheet={toggleFolderBottomSheet}>
        <FolderMoveContent toggleBottomSheet={toggleFolderBottomSheet} />
      </BottomSheet>
    </>
  );
};

export default SmallCard;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: 169,
      paddingVertical: 16,
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
    cardImageContainer: {
      width: 76,
      height: 76,
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
    },
    footerFront: {
      flexDirection: 'row',
      gap: 12,
    },
    folderText: {
      color: theme.TEXT600,
      ...FONTS.BODY2_REGULAR,
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
