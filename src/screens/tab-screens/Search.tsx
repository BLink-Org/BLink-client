import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  type ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import SmallCard from '@/components/home/SmallCard';
import SearchHeader from '@/components/search/SearchHeader';
import {FONTS} from '@/constants';
import RecentSearch from '@/components/search/ResentSearch';
import {useSearchLinks} from '@/api/hooks/useLink';
import {
  type ILinkDtos,
  type ITheme,
  type SearchWebViewNavigationProp,
} from '@/types';
import SmallCardPlaceHolder from '@/components/home/SmallCardPlaceHolder';

const SearchPage = () => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [finalSearchQuery, setFinalSearchQuery] = useState<string>('');
  const isQueryEnabled = finalSearchQuery.trim().length > 0;

  const {
    data: linkData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useSearchLinks({
    query: finalSearchQuery,
    size: 10,
    enabled: isQueryEnabled, // 검색어가 있을 때만 쿼리를 실행
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // 검색 완료 버튼 클릭 시 호출 -> 최종적으로 검색어를 적용
  const handleSearchSubmit = useCallback(() => {
    if (searchQuery.trim()) {
      setFinalSearchQuery(searchQuery);
    }
  }, [searchQuery]);

  const navigation = useNavigation<SearchWebViewNavigationProp>();

  const handleCardPress = (index: number) => {
    navigation.navigate('SearchWebView', {
      query: finalSearchQuery,
      size: 10,
      initialIndex: index,
    });
  };
  // FlatList 사용 최적화
  const renderItem: ListRenderItem<ILinkDtos> = useCallback(
    ({item, index}) => {
      const isLastItem =
        index ===
        (linkData?.pages.flatMap(page => page.linkDtos).length ?? 0) - 1;

      // 로딩 중이면 로딩 카드 렌더링
      if (isLoading) {
        <SmallCardPlaceHolder />;
      }

      return (
        <View>
          <TouchableOpacity onPress={() => handleCardPress(index)}>
            <SmallCard content={item} linkInfoArgs={{size: 10}} />
          </TouchableOpacity>
          {!isLastItem && <View style={styles.separator} />}
        </View>
      );
    },
    [isLoading, linkData],
  );

  // 검색 결과 헤더
  const renderHeader = useMemo(
    () => (
      <View style={styles.headerText}>
        <Text style={styles.headerTextContent}>
          {linkData?.pages[0].linkCount} Links
        </Text>
      </View>
    ),
    [linkData],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <View style={styles.container}>
        <SearchHeader
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          handleSearchSubmit={handleSearchSubmit}
        />
        {finalSearchQuery === '' ? (
          <RecentSearch recentSearches={[]} />
        ) : isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={
              isLoading
                ? Array(10).fill({})
                : linkData?.pages.flatMap(page => page.linkDtos)
            }
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.contentContainer}
            initialNumToRender={10}
            windowSize={10}
            onEndReached={() => {
              if (hasNextPage && !isLoading) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              isFetchingNextPage ? (
                <ActivityIndicator size="small" color="#6D96FF" />
              ) : null
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchPage;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: 18,
      paddingBottom: 80,
    },
    separator: {
      height: 1,
      marginHorizontal: -18,
      backgroundColor: theme.TEXT200,
    },
    headerText: {
      marginVertical: 10,
    },
    headerTextContent: {
      ...FONTS.BODY1_MEDIUM,
      color: theme.TEXT900,
    },
  });
