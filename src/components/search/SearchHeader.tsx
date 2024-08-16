import {memo, useMemo} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {FONTS} from '@/constants';
import {SearchIcon} from '@/assets/icons/search';
import {useThemeStore} from '@/store/useThemeStore';
import {type ITheme} from '@/types';

interface SearchHeaderProps {
  searchQuery: string;
  handleSearch: (text: string) => void;
  handleSearchSubmit: () => void; // 검색 완료 핸들러
}

const SearchHeader = memo(
  ({searchQuery, handleSearch, handleSearchSubmit}: SearchHeaderProps) => {
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
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="done" // 키보드 '완료' 버튼을 표시
        />
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={handleSearchSubmit}>
          <SearchIcon strokeWidth={1.5} fill={theme.TEXT900} />
        </TouchableOpacity>
      </View>
    );
  },
);

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
