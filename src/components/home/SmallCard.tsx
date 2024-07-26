import React, {useState, useMemo, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useThemeStore} from '@/store/useThemeStore';
import {
  BookmarkSelectedIcon,
  BookmarkUnselectedIcon,
} from '@/assets/icons/common';
import {FONTS} from '@/constants';
import {ThreeDotIcon} from '@/assets/icons/home';
import {type IFileList} from '@/types/home';
import {DeleteIcon, PencilIcon} from '@/assets/icons/mypage';
import DropDownModal from '@/components/modal/DropDownModal';
import {useModalStore} from '@/store/useModalStore';
import AlertModal from '@/components/modal/AlertModal';

const screenWidth = Dimensions.get('screen').width - 36;

interface LargeCardProps {
  content: IFileList;
  isTrash?: boolean;
}

const SmallCard = ({content, isTrash}: LargeCardProps) => {
  const {theme} = useThemeStore();
  const {showModal, closeModal} = useModalStore();

  const CardImage = useMemo(() => {
    return theme.SMALL_CARD_IMAGE;
  }, [theme]);

  // 드롭다운 모달 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeDropdown = () => setIsDropdownOpen(false);

  const [anchorPosition, setAnchorPosition] = useState({x: 0, y: 0});
  const buttonRef = useRef<TouchableOpacity>(null);

  const toggleDropdown = () => {
    buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setIsDropdownOpen(true);
      setAnchorPosition({x: pageX, y: pageY + height});
    });
  };

  const handleSelect = (label: string) => {
    const modalId = `trashOption-${label}`;
    showModal(modalId);
  };

  const handleConfirmSelect = (label: string) => {
    const modalId = `trashOption-${label}`;
    if (label === '영구삭제') {
      // 영구 삭제 api 연동
      console.log('영구 삭제');
    }
    if (label === '복원') {
      // 복원 api 연동
      console.log('복원');
    }
    closeModal(modalId);
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.dotPosition}>
        <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT600}]}>
          {content.folder}
        </Text>
        <TouchableOpacity ref={buttonRef} onPress={toggleDropdown}>
          <ThreeDotIcon />
        </TouchableOpacity>
        {isDropdownOpen && isTrash && (
          <DropDownModal
            isVisible={isDropdownOpen}
            options={trashOptions}
            onClose={closeDropdown}
            anchorPosition={anchorPosition}
          />
        )}
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text
            style={[FONTS.BODY1_MEDIUM, {color: theme.TEXT900}]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {content.title}
          </Text>
          <View style={styles.descriptionTop} />
          <Text
            style={[FONTS.BODY2_REGULAR, {color: theme.TEXT500}]}
            numberOfLines={content.title.length > 30 ? 1 : 2}
            ellipsizeMode="tail">
            {content.description}
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
          <Text style={[FONTS.CAPTION_REGULAR, {color: theme.TEXT500}]}>
            {content.saveDay}
          </Text>
          <Text style={[FONTS.CAPTION_REGULAR, {color: theme.TEXT500}]}>
            {content.hostname}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleBookmark}>
          {isBookmarked ? <BookmarkSelectedIcon /> : <BookmarkUnselectedIcon />}
        </TouchableOpacity>
      </View>

      {/* alertModal 처리 */}
      <AlertModal
        modalId={`trashOption-복원`}
        headerText={`링크를 복원하시겠어요?`}
        bodyText={'마지막에 저장되어있던 위치로 돌아가요'}
        leftText="취소"
        rightText="복원"
        rightOnPress={() => handleConfirmSelect(`복원`)}
      />
      <AlertModal
        modalId={`trashOption-영구삭제`}
        headerText={`영구 삭제 하시겠어요? `}
        bodyText={`휴지통에서 삭제된 링크는 복원할 수 없어요`}
        leftText="취소"
        rightText="삭제"
        rightOnPress={() => handleConfirmSelect(`영구삭제`)}
      />
    </View>
  );
};

export default SmallCard;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
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
});
