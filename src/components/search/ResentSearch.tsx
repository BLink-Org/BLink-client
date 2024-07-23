import React, {useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  type ListRenderItem,
} from 'react-native';
import {type IFileList} from '@/types/home';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import DeleteCard from '@/components/search/DeleteCard';
import {EdgeLogoIcon} from '@/assets/icons/search';

const RecentSearch = ({recentSearches}: {recentSearches: IFileList[]}) => {
  const {theme} = useThemeStore();

  const renderItem: ListRenderItem<IFileList> = useCallback(
    ({item, index}) => (
      <View style={styles.itemContainer}>
        <DeleteCard content={item} />
        <View style={[styles.separator, {backgroundColor: theme.TEXT200}]} />
      </View>
    ),
    [recentSearches],
  );

  // 데이터가 없을 경우 아이콘을 표시

  if (recentSearches.length === 0) {
    return (
      <View style={styles.emptyDataContainer}>
        <EdgeLogoIcon />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <Text style={[FONTS.BODY1_MEDIUM, {color: theme.TEXT900}]}>
          최근 확인한 링크
        </Text>
      </View>
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    paddingHorizontal: 18,
  },
  headerText: {
    paddingHorizontal: 18,
    marginVertical: 10,
  },
  separator: {
    height: 1,
    marginHorizontal: -18,
  },
  emptyDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecentSearch;
