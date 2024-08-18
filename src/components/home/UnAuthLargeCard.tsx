import {useState, useMemo, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useThemeStore} from '@/store/useThemeStore';
import {PinnedSelectedIcon, PinnedUnselectedIcon} from '@/assets/icons/common';
import {FONTS} from '@/constants';
import {MoveIcon, ShareIcon, ThreeDotIcon} from '@/assets/icons/home';
import {
  type ITheme,
  type ILinkDtos,
  type RootStackNavigationProp,
} from '@/types';
import {DeleteIcon, PencilIcon} from '@/assets/icons/mypage';
import DropDownModal from '@/components/modal/DropDownModal';
import {shareUrl} from '@/utils/url-utils';
import LoginModal from '../modal/LoginModal';

const screenWidth = Dimensions.get('screen').width - 36;
const aspectRatio = 339 / 140;
const cardHeight = screenWidth / aspectRatio;

interface LargeCardProps {
  content: ILinkDtos;
}

const UnAuthLargeCard = ({content}: LargeCardProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<RootStackNavigationProp>();

  const CardImage = useMemo(() => {
    return theme.BIG_CARD_IMAGE;
  }, [theme]);

  // 로그인 모달
  const [isNoticeModalVisible, setIsNoticeModalVisible] = useState(false);

  // 모달 닫은 후 로그인으로 이동
  const handleModalClose = () => {
    navigation.navigate('Onboarding');
    setIsNoticeModalVisible(false);
  };
  // 로그인 모달 열기
  const onPressLoginAlert = () => {
    setIsNoticeModalVisible(true);
  };

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

  const editOptions = useMemo(
    () => [
      {
        label: '제목 수정',
        icon: <PencilIcon />,
        onSelect: () => {
          closeDropdown();
          onPressLoginAlert();
        },
      },
      {
        label: '폴더 이동',
        icon: <MoveIcon />,
        onSelect: () => {
          closeDropdown();
          onPressLoginAlert();
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
          onPressLoginAlert();
          closeDropdown();
        },
      },
    ],
    [closeDropdown],
  );

  const [isPinned, setIsPinned] = useState(false);
  const handlePinToggle = () => {
    setIsPinned(prevState => !prevState);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.cardImageContainer}>
          <TouchableOpacity style={styles.dotPosition}>
            <TouchableOpacity
              ref={buttonRef}
              onPress={toggleDropdown}
              style={styles.dotPadding}>
              <ThreeDotIcon fill={theme.TEXT300} />
            </TouchableOpacity>
            {isDropdownOpen && (
              <DropDownModal
                isVisible={isDropdownOpen}
                options={editOptions}
                onClose={closeDropdown}
                anchorPosition={anchorPosition}
              />
            )}
          </TouchableOpacity>
          {content.imageUrl ? (
            <Image
              source={{uri: content.imageUrl}}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <CardImage width={screenWidth} height={cardHeight} />
          )}
        </View>
        <View style={styles.folderTop} />
        <Text style={styles.folderText}>
          {content.folderName ?? '폴더 없는 링크'}
        </Text>
        <View style={styles.titleTop} />
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
          {content.title === '' ? '제목 없음' : content.title}
        </Text>
        <View style={styles.footerTop} />
        <View style={styles.footer}>
          <View style={styles.footerFront}>
            <Text style={styles.footerText}>{content.createdAt}</Text>
            <Text style={styles.footerText}>notion.site</Text>
          </View>
          <TouchableOpacity onPress={handlePinToggle}>
            {isPinned ? (
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
        </View>
      </View>
      <LoginModal
        isVisible={isNoticeModalVisible}
        onClose={() => setIsNoticeModalVisible(false)}
        onClick={handleModalClose}
      />
    </>
  );
};

export default UnAuthLargeCard;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      width: screenWidth,
      paddingVertical: 16,
    },
    cardImageContainer: {
      width: screenWidth,
      height: cardHeight,
      borderRadius: 8,
      overflow: 'hidden',
      position: 'relative',
    },

    dotPosition: {
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 1,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    dotPadding: {
      marginHorizontal: -16,
      paddingHorizontal: 16,
    },
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    folderTop: {
      marginTop: 12,
    },
    titleTop: {
      marginTop: 4,
    },
    footerTop: {
      marginTop: 8,
    },
    folderText: {
      color: theme.TEXT600,
      ...FONTS.BODY2_REGULAR,
    },
    titleText: {
      color: theme.TEXT900,
      ...FONTS.BODY1_MEDIUM,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    footerFront: {
      flexDirection: 'row',
      gap: 12,
    },
    footerText: {
      color: theme.TEXT500,
      ...FONTS.CAPTION_REGULAR,
    },
  });
