import React, {memo} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {FONTS} from '@/constants';
import {SearchIcon} from '@/assets/icons/search';
import {useThemeStore} from '@/store/useThemeStore';

interface SearchHeaderProps {
  searchQuery: string;
  handleSearch: (text: string) => void;
}

const SearchHeader = memo(({searchQuery, handleSearch}: SearchHeaderProps) => {
  const {theme} = useThemeStore();

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={[
          styles.searchInput,
          FONTS.BODY2_MEDIUM,
          {backgroundColor: theme.TEXT200},
        ]}
        onChangeText={handleSearch}
        value={searchQuery}
        placeholder="전체에서 검색"
        placeholderTextColor={theme.TEXT300}
      />
      <View style={styles.searchIcon}>
        <SearchIcon />
      </View>
    </View>
  );
});

// display name
SearchHeader.displayName = 'SearchHeader';

export default SearchHeader;

const styles = StyleSheet.create({
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
  },
  searchIcon: {
    position: 'absolute',
    right: 16,
  },
});
