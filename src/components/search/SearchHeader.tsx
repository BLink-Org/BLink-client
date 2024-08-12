import {memo, useMemo} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {FONTS} from '@/constants';
import {SearchIcon} from '@/assets/icons/search';
import {useThemeStore} from '@/store/useThemeStore';
import {type ITheme} from '@/types';

interface SearchHeaderProps {
  searchQuery: string;
  handleSearch: (text: string) => void;
}

const SearchHeader = memo(({searchQuery, handleSearch}: SearchHeaderProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        onChangeText={handleSearch}
        value={searchQuery}
        placeholder="전체에서 검색"
        placeholderTextColor={theme.TEXT300}
      />
      <View style={styles.searchIcon}>
        <SearchIcon strokeWidth={1.5} fill={theme.TEXT900} />
      </View>
    </View>
  );
});

// display name
SearchHeader.displayName = 'SearchHeader';

export default SearchHeader;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    searchContainer: {
      marginVertical: 16,
      marginHorizontal: 18,
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
    },
    searchInput: {
      flex: 1,
      height: 50,
      borderRadius: 8,
      paddingLeft: 16,
      paddingRight: 46,
      color: theme.TEXT800,
      backgroundColor: theme.TEXT200,
      ...FONTS.BODY2_MEDIUM,
    },
    searchIcon: {
      position: 'absolute',
      right: 16,
    },
  });
