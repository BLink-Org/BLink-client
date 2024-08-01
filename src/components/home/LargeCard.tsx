import {useState, useMemo} from 'react';
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
import {type ITheme} from '@/types';

const screenWidth = Dimensions.get('screen').width - 36;
const aspectRatio = 339 / 140; // 카드 비율
const cardHeight = screenWidth / aspectRatio;

interface LargeCardProps {
  content: IFileList;
}

const LargeCard = ({content}: LargeCardProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const CardImage = useMemo(() => {
    return theme.BIG_CARD_IMAGE;
  }, [theme]);

  // 토글 상태 관리
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
      <View style={styles.cardImageContainer}>
        {content.imageUrl && imageLoading && <LoadingScreen />}
        <TouchableOpacity style={styles.dotPosition}>
          <ThreeDotIcon />
        </TouchableOpacity>
        {content.imageUrl ? (
          <Image
            source={{uri: content.imageUrl}}
            style={styles.image}
            onLoad={handleImageLoad}
            onError={handleImageLoad}
          />
        ) : (
          <CardImage width={screenWidth} height={cardHeight} />
        )}
      </View>
      <View style={styles.folderTop} />
      <Text style={styles.folderText}>{content.folder}</Text>
      <View style={styles.titleTop} />
      <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
        {content.title}
      </Text>
      <View style={styles.footerTop} />
      <View style={styles.footer}>
        <View style={styles.footerFront}>
          <Text style={styles.footerText}>{content.saveDay}</Text>
          <Text style={styles.footerText}>{content.hostname}</Text>
        </View>
        <TouchableOpacity onPress={toggleBookmark}>
          {isBookmarked ? <BookmarkSelectedIcon /> : <BookmarkUnselectedIcon />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LargeCard;

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
