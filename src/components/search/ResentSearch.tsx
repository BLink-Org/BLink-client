import {useCallback, useMemo} from 'react';
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
import {type ITheme} from '@/types';

const RecentSearch = ({recentSearches}: {recentSearches: IFileList[]}) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderItem: ListRenderItem<IFileList> = useCallback(
    ({item, index}) => (
      <View style={styles.itemContainer}>
        <DeleteCard content={item} />
        <View style={styles.separator} />
      </View>
    ),
    [recentSearches, styles.separator],
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
        <Text style={styles.headerTitle}>최근 확인한 링크</Text>
      </View>
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default RecentSearch;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
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
    headerTitle: {
      ...FONTS.BODY1_MEDIUM,
      color: theme.TEXT900,
    },
    separator: {
      height: 1,
      marginHorizontal: -18,
      backgroundColor: theme.TEXT200,
    },
    emptyDataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
