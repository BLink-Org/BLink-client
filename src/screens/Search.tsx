import React, {useState, useCallback} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import SmallCard from '@/components/home/SmallCard';
import {type IFileList} from '@/types/home';
import dummyFileData from '@/constants/dummy-data/dummy-file-list.json';
import SearchHeader from '@/components/search/SearchHeader';
import {FONTS} from '@/constants';
import RecentSearch from '@/components/search/ResentSearch';
import dummyRecentData from '@/constants/dummy-data/dummy-recent-list.json';
import useSearchData from '@/hooks/useSearchData';

const Search = () => {
  const {theme} = useThemeStore();

  // 최근 검색 기록 더미 데이터 -> 추후 api로 받아오기
  const recentSearches = dummyRecentData;
  // 최근 검색 기록이 없는 경우 -> const recentSearchEmpty: [] = [];

  // 검색 필터 커스텀 훅
  const {searchQuery, handleSearch, filteredData} =
    useSearchData(dummyFileData);

  const renderItem: ListRenderItem<IFileList> = useCallback(
    ({item, index}) => (
      <View>
        <SmallCard content={item} />
        {index !== filteredData.length - 1 && (
          <View style={[styles.separator, {backgroundColor: theme.TEXT200}]} />
        )}
      </View>
    ),
    [filteredData, theme],
  );

  const renderHeader = () => (
    <View style={styles.headerText}>
      <Text style={[FONTS.BODY1_MEDIUM, {color: theme.TEXT900}]}>
        {filteredData.length} Links
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <View style={styles.container}>
        <SearchHeader searchQuery={searchQuery} handleSearch={handleSearch} />
        {searchQuery === '' ? (
          // <RecentSearch recentSearches={recentSearchEmpty} />
          <RecentSearch recentSearches={recentSearches} />
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.contentContainer}
            initialNumToRender={10}
            windowSize={10}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
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
  },
  headerText: {
    marginVertical: 10,
  },
});
