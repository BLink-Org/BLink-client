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
import {type IFileList} from '@/types/home';

const screenWidth = Dimensions.get('screen').width - 36;

interface LargeCardProps {
  content: IFileList;
}

const SmallCard = ({content}: LargeCardProps) => {
  const {theme} = useThemeStore();
  const CardImage = useMemo(() => {
    return theme.SMALL_CARD_IMAGE;
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
      <View style={styles.dotPosition}>
        <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT600}]}>
          {content.folder}
        </Text>
        <TouchableOpacity>
          <ThreeDotIcon />
        </TouchableOpacity>
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
