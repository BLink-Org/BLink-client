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
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import SmallCard from '@/components/home/SmallCard';
import SearchHeader from '@/components/search/SearchHeader';
import {FONTS} from '@/constants';
import {
  useDeleteRecentLink,
  useRecentSearch,
  useSearchLinks,
} from '@/api/hooks/useLink';
import {
  type ILinkDtos,
  type ITheme,
  type SearchWebViewNavigationProp,
} from '@/types';
import CustomLoading from '@/components/common/CustomLoading';
import RecentSearch from '@/components/search/ResentSearch';
import CustomStatusBar from '@/components/common/CustomStatusBar';
import { trackEvent } from '@/utils/amplitude-utils';

const SearchPage = () => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {t} = useTranslation();

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

  // 최근 검색 목록 get
  const {data: recentSearches} = useRecentSearch();

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query.trim() === '') {
        setFinalSearchQuery('');
      }
    },
    [setSearchQuery, setFinalSearchQuery],
  );

  // 삭제 훅 사용
  const {mutate: deleteLink} = useDeleteRecentLink();
  const handleDelete = (linkId: string) => {
    deleteLink(linkId); // 단순히 삭제 호출
  };
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
    trackEvent('Link_ViewPage_Opened', {Link_Viewed_Location: 'search'});
  };

  const linkInfoArgsOptions = {
    query: finalSearchQuery,
    size: 10,
  };
  // FlatList 사용 최적화
  const renderItem: ListRenderItem<ILinkDtos> = useCallback(
    ({item, index}) => {
      const isLastItem =
        index ===
        (linkData?.pages.flatMap(page => page.linkDtos).length ?? 0) - 1;
      return (
        <View>
          <TouchableOpacity onPress={() => handleCardPress(index)}>
            <SmallCard
              content={item}
              linkInfoArgs={linkInfoArgsOptions}
              page="search"
            />
          </TouchableOpacity>
          {!isLastItem && <View style={styles.separator} />}
        </View>
      );
    },
    [isLoading, linkData],
  );

  // 검색 결과 헤더
  const renderHeader = useMemo(() => {
    return (
      <View style={styles.headerText}>
        <Text style={styles.headerTextContent}>
          {linkData?.pages[0].linkCount ?? 0} Links
        </Text>
      </View>
    );
  }, [linkData]);

  // 검색 결과 없음 화면
  const NoSearchResults = () => {
    if (!recentSearches) {
      return null;
    }
    return (
      <RecentSearch recentSearches={recentSearches} onDelete={handleDelete} />
    );
  };

  const renderNoResults = () => {
    if (linkData?.pages[0].linkCount === 0) {
      return (
        <View style={styles.container}>
          <View style={styles.centerContainer}>
            <Image
              source={theme.SEARCH_EDGE_IMAGE}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.noExistText}>
              {t('조건에 맞는 검색 결과가 없어요.')}
            </Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <CustomStatusBar />
      <View style={styles.container}>
        <SearchHeader
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          handleSearchSubmit={handleSearchSubmit}
        />
        {finalSearchQuery.trim() === '' ? (
          <NoSearchResults />
        ) : isLoading ? (
          <CustomLoading />
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
            ListEmptyComponent={renderNoResults}
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
    centerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    },
    image: {
      width: 220,
      height: 220,
    },
    container: {
      flex: 1,
    },
    noExistText: {
      color: theme.TEXT500,
      ...FONTS.BODY2_MEDIUM,
    },
    contentContainer: {
      paddingHorizontal: 18,
      paddingBottom: 30,
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
