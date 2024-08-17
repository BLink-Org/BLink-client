import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
  RefreshControl,
  Platform,
  ActivityIndicator,
  type ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {FONTS} from '@/constants';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import LargeCard from '@/components/home/LargeCard';
import SmallCard from '@/components/home/SmallCard';
import useStickyAnimation from '@/hooks/useStickyAnimation';
import FolderSideBar from '@/components/modal/FolderSideBar';
import {useBottomButtonSizeStore} from '@/store/useBottomButtonSizeStore';
import {
  type WebViewListNavigationProp,
  type ILinkDtos,
  type ITheme,
} from '@/types';
import useToast from '@/hooks/useToast';
import SmallCardPlaceHolder from '@/components/home/SmallCardPlaceHolder';
import {useLinks} from '@/api/hooks/useLink';
import AnimatedLogoHeader from '@/components/common/AnimatedLogoHeader';
import LargeCardPlaceHolder from '@/components/home/LargeCardPlaceHolder';
import HomeListHeader from '@/components/home/HomeListHeader';
import {getSortByValue, getSortingOptions} from '@/utils/sorting-utils';

const Home = () => {
  const {t} = useTranslation();
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // 하단 버튼 크기 계산 -> 전역변수 관리
  const {bottom} = useSafeAreaInsets();
  const isHomeIndicatorPresent = Platform.OS === 'ios' && bottom > 0;
  const {setButtonHeight} = useBottomButtonSizeStore();
  const {renderToast, showToast} = useToast({marginBottom: 44});

  // 폴더 사이드바 토글
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  // 홈 화면 제목 - 선택한 폴더 아이디 (null: 전체)
  const [selectedFolderId, setSelectedFolderId] = useState<number[]>([]);
  const [selectedFolderName, setSelectedFolderName] = useState<string>('전체');

  const sortingOptions = getSortingOptions(t);

  const [selectedSortingOption, setSelectedSortingOption] = useState(
    sortingOptions[0],
  );
  const handleSelection = (selected: string) => {
    setSelectedSortingOption(selected);
  };

  const linkInfoArgsOptions = {
    folderId: selectedFolderId[0],
    size: 10,
    sortBy: getSortByValue(t, selectedSortingOption),
  };

  const {
    data: linkData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    linkCount,
  } = useLinks(linkInfoArgsOptions);

  // 웹뷰에 전달
  const navigation = useNavigation<WebViewListNavigationProp>();
  const handleCardPress = (index: number) => {
    navigation.navigate('WebViewList', {
      folderId: selectedFolderId[0] ?? null,
      sortBy: getSortByValue(t, selectedSortingOption),
      initialIndex: index,
      size: 10,
    });
  };

  // 카드 사이즈 조절
  const [isLargeCard, setIsLargeCard] = useState(false);
  const toggleCardSize = () => {
    setIsLargeCard(prevState => !prevState);
  };

  // 새로고침 상태 관리
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [refetch]);

  // sticky header 애니메이션
  const {translateY, handleScroll} = useStickyAnimation(refreshing);

  // FlatList 사용 최적화
  const renderItem: ListRenderItem<ILinkDtos> = useCallback(
    ({item, index}) => {
      const isLastItem =
        index ===
        (linkData?.pages.flatMap(page => page.linkDtos).length ?? 0) - 1;

      // 로딩 중이면 로딩 카드 렌더링
      if (isLoading) {
        return isLargeCard ? (
          <LargeCardPlaceHolder />
        ) : (
          <SmallCardPlaceHolder />
        );
      }

      // 로딩이 완료되면 카드 렌더링
      const CardComponent = isLargeCard ? LargeCard : SmallCard;
      return (
        <View>
          <TouchableOpacity onPress={() => handleCardPress(index)}>
            <CardComponent
              content={item}
              showToast={showToast}
              linkInfoArgs={linkInfoArgsOptions}
            />
          </TouchableOpacity>
          {!isLastItem && <View style={styles.separator} />}
        </View>
      );
    },
    [isLoading, isLargeCard, linkData, showToast],
  );

  useEffect(() => {
    const calculatedHeight = isHomeIndicatorPresent ? 80 : 58;
    setButtonHeight(calculatedHeight);
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.BACKGROUND}]}>
      <ThemeBackground />
      <View style={styles.mainContainer}>
        <AnimatedLogoHeader
          translateY={translateY}
          toggleSideBar={toggleSideBar}
          backgroundThemeColor={
            theme.THEME_NUMBER === 3 ? theme.MAIN200 : theme.BACKGROUND
          }
        />
        <FlatList
          data={
            isLoading
              ? Array(10).fill({})
              : linkData?.pages.flatMap(page => page.linkDtos)
          }
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <HomeListHeader
              selectedFolderName={selectedFolderName}
              linkCount={linkCount ?? 0}
              sortingOptions={sortingOptions}
              selectedSortingOption={selectedSortingOption}
              handleSelection={handleSelection}
              isLargeCard={isLargeCard}
              toggleCardSize={toggleCardSize}
            />
          }
          contentContainerStyle={styles.contentContainer}
          initialNumToRender={10}
          windowSize={10}
          onEndReached={() => {
            if (hasNextPage && !isLoading) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          onScroll={handleScroll}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressViewOffset={60}
            />
          }
          ListFooterComponent={() =>
            isFetchingNextPage ? (
              <ActivityIndicator size="small" color="#6D96FF" />
            ) : null
          }
        />
      </View>

      {/* 폴더 사이드바 */}
      <FolderSideBar
        {...{
          isSideBarVisible,
          toggleSideBar,
          selectedFolderId,
          setSelectedFolderId,
          setSelectedFolderName,
        }}
      />
      {/* 삭제 토스트 메세지 처리 */}
      {renderToast()}
    </SafeAreaView>
  );
};

export default Home;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    mainContainer: {
      flex: 1,
      overflow: 'hidden',
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: theme.BACKGROUND,
    },
    contentContainer: {
      paddingTop: 60,
      paddingHorizontal: 18,
    },
    titleContainer: {
      height: 69,
      justifyContent: 'center',
    },
    title: {
      color: theme.TEXT900,
      ...FONTS.TITLE,
    },
    filterContainer: {
      height: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    linkCount: {
      color: theme.MAIN500,
      ...FONTS.BODY2_MEDIUM,
    },
    sizeIconContainer: {
      marginLeft: 12,
    },
    separator: {
      height: 1,
      marginHorizontal: -18,
      backgroundColor: theme.TEXT200,
    },
  });
