import {useCallback, useState, useMemo} from 'react';
import {
  FlatList,
  type ListRenderItem,
  RefreshControl,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import SmallCard from '@/components/home/SmallCard';
import useStickyAnimation from '@/hooks/useStickyAnimation';
import {type ILinkDtos, type ITheme} from '@/types';
import {useTrashLinks} from '@/api/hooks/useLink';
import AnimatedHeader from '@/components/mypage/AnimatedHeader';
import SmallCardPlaceHolder from '@/components/home/SmallCardPlaceHolder';
import ListHeader from '@/components/mypage/ListHeaderComponent';
import ListEmpty from '@/components/home/ListEmpty';

const Trash = () => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigation = useNavigation();

  const sortingOptions = ['최근 삭제순', '과거 삭제순'];
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    sortingOptions[0],
  );

  const linkInfoArgsOptions = {
    size: 10,
    sortBy:
      selectedSortingOption === '최근 삭제순'
        ? 'trashMovedDate_desc'
        : 'trashMovedDate_asc',
  };

  const {
    data: linkData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    linkCount,
  } = useTrashLinks(linkInfoArgsOptions);

  const handleSelection = (selected: string) => {
    setSelectedSortingOption(selected);
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [refetch]);

  const {translateY, handleScroll} = useStickyAnimation(refreshing);
  const insets = useSafeAreaInsets();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderItem: ListRenderItem<ILinkDtos> = useCallback(
    ({item, index}) => {
      const isLastItem =
        index ===
        (linkData?.pages.flatMap(page => page.linkDtos).length ?? 0) - 1;
      if (isLoading) {
        return <SmallCardPlaceHolder />;
      }
      return (
        <View>
          <SmallCard
            content={item}
            linkInfoArgs={linkInfoArgsOptions}
            page="trash"
          />
          {!isLastItem && <View style={styles.separator} />}
        </View>
      );
    },
    [isLoading, linkData],
  );

  return (
    <>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ThemeBackground />
        <View style={styles.mainContainer}>
          <AnimatedHeader
            translateY={translateY}
            handleGoBack={handleGoBack}
            themeBackground={theme.BACKGROUND}
            arrowColor={theme.TEXT900}
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
              <ListHeader
                linkCount={linkCount}
                sortingOptions={sortingOptions}
                selectedSortingOption={selectedSortingOption}
                handleSelection={handleSelection}
                theme={theme}
              />
            }
            contentContainerStyle={[
              styles.contentContainer,
              {paddingBottom: insets.bottom},
            ]}
            initialNumToRender={10}
            onScroll={handleScroll}
            windowSize={10}
            onEndReached={() => {
              if (hasNextPage && !isLoading) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressViewOffset={60}
              />
            }
            ListEmptyComponent={
              <ListEmpty
                textColor={theme.TEXT500}
                message="휴지통으로 이동된 링크가 아직 없어요"
              />
            }
            ListFooterComponent={() =>
              isFetchingNextPage ? (
                <ActivityIndicator size="small" color="#6D96FF" />
              ) : null
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Trash;

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
      paddingHorizontal: 18,
    },
    separator: {
      height: 1,
      marginHorizontal: -18,
      backgroundColor: theme.TEXT200,
    },
  });
