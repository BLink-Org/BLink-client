import {useState, useMemo, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  type TextLayoutEventData,
  type NativeSyntheticEvent,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useThemeStore} from '@/store/useThemeStore';
import {PinnedSelectedIcon, PinnedUnselectedIcon} from '@/assets/icons/common';
import {FONTS} from '@/constants';
import {MoveIcon, ShareIcon, ThreeDotIcon} from '@/assets/icons/home';
import {DeleteIcon, PencilIcon} from '@/assets/icons/mypage';
import DropDownModal from '@/components/modal/DropDownModal';
import {
  type ILinkDtos,
  type ITheme,
  type RootStackNavigationProp,
} from '@/types';
import {shareUrl} from '@/utils/url-utils';
import LoginModal from '@/components/modal/LoginModal';

interface SmallCardProps {
  content: ILinkDtos;
}

const UnAuthSmallCard = ({content}: SmallCardProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {t} = useTranslation();

  const navigation = useNavigation<RootStackNavigationProp>();
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

  const CardImage = useMemo(() => {
    return theme.SMALL_CARD_IMAGE;
  }, [theme]);

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
    } else {
      setIsDropdownOpen(false);
    }
  };

  const editOptions = useMemo(
    () => [
      {
        label: t('제목 수정'),
        icon: <PencilIcon />,
        onSelect: () => {
          closeDropdown();
          onPressLoginAlert();
        },
      },
      {
        label: t('폴더 이동'),
        icon: <MoveIcon />,
        onSelect: () => {
          closeDropdown();
          onPressLoginAlert();
        },
      },
      {
        label: t('공유'),
        icon: <ShareIcon />,
        onSelect: () => {
          const currentUrl = content.url ?? '';
          shareUrl(currentUrl);
        },
      },

      {
        label: t('삭제'),
        icon: <DeleteIcon />,
        onSelect: () => {
          closeDropdown();
          onPressLoginAlert();
        },
      },
    ],
    [closeDropdown],
  );

  const [isPinned, setIsPinned] = useState(false);
  const handlePinToggle = () => {
    setIsPinned(prevState => !prevState);
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
              options={editOptions}
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
                    domain: 'notion.site',
                  })
                : content.title}
            </Text>
            <View style={styles.descriptionTop} />
            <Text
              style={styles.descriptionText}
              numberOfLines={contentLines}
              ellipsizeMode="tail">
              {content?.contents === ''
                ? t('내용이 없는 링크입니다.')
                : content.contents}
            </Text>
          </View>
          <View style={styles.cardImageContainer}>
            {content.imageUrl ? (
              <Image source={{uri: content.imageUrl}} style={styles.image} />
            ) : (
              <CardImage width={84} height={84} />
            )}
          </View>
        </View>
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

export default UnAuthSmallCard;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: 180,
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
