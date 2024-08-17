import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
  RefreshControl,
  type ListRenderItem,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import SmallCard from '@/components/home/SmallCard';
import useStickyAnimation from '@/hooks/useStickyAnimation';
import {type ILinkDtos, type ITheme} from '@/types';
import {getSortByValue, getSortingOptions} from '@/utils/sorting-utils';
import {usePinnedLinks} from '@/api/hooks/useLink';
import SmallCardPlaceHolder from '@/components/home/SmallCardPlaceHolder';
import {useBottomButtonSizeStore} from '@/store/useBottomButtonSizeStore';
import useToast from '@/hooks/useToast';
import AnimatedLogoHeader from '@/components/common/AnimatedLogoHeader';
import BookmarkListHeader from '@/components/home/BookmarkListHeader';

const Bookmark = () => {
  const {t} = useTranslation();
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // 하단 버튼 크기 계산 -> 전역변수 관리
  const {bottom} = useSafeAreaInsets();
  const isHomeIndicatorPresent = Platform.OS === 'ios' && bottom > 0;
  const {setButtonHeight} = useBottomButtonSizeStore();
  const {renderToast, showToast} = useToast({marginBottom: 44});

  const sortingOptions = getSortingOptions(t);
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    sortingOptions[0],
  );
  const handleSelection = (selected: string) => {
    setSelectedSortingOption(selected);
  };

  const linkInfoArgsOptions = {
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
  } = usePinnedLinks(linkInfoArgsOptions);

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

      if (!linkData || isLoading) {
        return <SmallCardPlaceHolder />;
      }

      // 로딩이 완료되면 카드 렌더링
      return (
        <View>
          <SmallCard
            content={item}
            showToast={showToast}
            linkInfoArgs={linkInfoArgsOptions}
            page="bookmark"
          />
          {!isLastItem && <View style={styles.separator} />}
        </View>
      );
    },
    [isLoading, linkData, showToast],
  );

  useEffect(() => {
    const calculatedHeight = isHomeIndicatorPresent ? 80 : 58;
    setButtonHeight(calculatedHeight);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <View style={styles.mainContainer}>
        <AnimatedLogoHeader
          translateY={translateY}
          toggleSideBar={() => {}}
          backgroundThemeColor={theme.BACKGROUND}
          isBookmark
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
            <BookmarkListHeader
              linkCount={linkCount ?? 0}
              sortingOptions={sortingOptions}
              selectedSortingOption={selectedSortingOption}
              handleSelection={handleSelection}
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
      {/* 삭제 토스트 메세지 처리 */}
      {renderToast()}
    </SafeAreaView>
  );
};

export default Bookmark;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    mainContainer: {
      flex: 1,
      overflow: 'hidden',
    },

    contentContainer: {
      paddingTop: 60,
      paddingHorizontal: 18,
    },
    separator: {
      height: 1,
      marginHorizontal: -18,
      backgroundColor: theme.TEXT200,
    },
  });
