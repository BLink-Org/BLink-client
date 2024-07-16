import React, {useState, useMemo} from 'react';
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

const screenWidth = Dimensions.get('screen').width - 36;
const aspectRatio = 339 / 140; // 카드 비율
const cardHeight = screenWidth / aspectRatio;

interface CardContent {
  imageUrl: string | null;
  title: string;
  description: string;
  saveDay: string;
  hostname: string;
  folder: string;
}

interface LargeCardProps {
  content: CardContent;
}

const LargeCard = ({content}: LargeCardProps) => {
  const {theme} = useThemeStore();
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
      <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT600}]}>
        {content.folder}
      </Text>
      <View style={styles.titleTop} />
      <Text style={[FONTS.BODY1_MEDIUM, {color: theme.TEXT900}]}>
        {content.title}
      </Text>
      <View style={styles.footerTop} />
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
    </View>
  );
};

export default LargeCard;

const styles = StyleSheet.create({
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  footerFront: {
    flexDirection: 'row',
    gap: 12,
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
});
