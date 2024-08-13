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
import {SafeAreaView} from 'react-native-safe-area-context';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import SmallCard from '@/components/home/SmallCard';
import useStickyAnimation from '@/hooks/useStickyAnimation';
import {type ILinkDtos, type ITheme} from '@/types';
import {useTrashLinks} from '@/api/hooks/useLink';
import ListHeader from '@/components/common/ListHeaderComponent';
import AnimatedHeader from '@/components/mypage/AnimatedHeader';

const Trash = () => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigation = useNavigation();

  const sortingOptions = ['최근 삭제순', '과거 삭제순'];
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    sortingOptions[0],
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
    linkCount,
  } = useTrashLinks({
    size: 10,
    sortBy:
      selectedSortingOption === '최근 삭제순'
        ? 'trashMovedDate_desc'
        : 'trashMovedDate_asc',
  });

  const handleSelection = (selected: string) => {
    setSelectedSortingOption(selected);
    refetch();
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [refetch]);

  const {translateY, handleScroll} = useStickyAnimation(refreshing);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderItem: ListRenderItem<ILinkDtos> = useCallback(
    ({item, index}) => (
      <View>
        <SmallCard content={item} isTrash={true} />
        {index !==
          (data?.pages.flatMap(page => page.linkDtos).length ?? 0) - 1 && (
          <View style={styles.separator} />
        )}
      </View>
    ),
    [data, styles.separator],
  );

  return (
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
          data={data?.pages.flatMap(page => page.linkDtos)}
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
          contentContainerStyle={styles.contentContainer}
          initialNumToRender={10}
          onScroll={handleScroll}
          windowSize={10}
          onEndReached={() => {
            if (hasNextPage) {
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
          ListFooterComponent={() =>
            isFetchingNextPage ? (
              <ActivityIndicator size="small" color="#6D96FF" />
            ) : null
          }
        />
      </View>
    </SafeAreaView>
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
