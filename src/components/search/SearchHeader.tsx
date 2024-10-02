import {memo, useMemo} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FONTS} from '@/constants';
import {SearchIcon} from '@/assets/icons/search';
import {useThemeStore} from '@/store/useThemeStore';
import {type ITheme} from '@/types';
import {trackEvent} from '@/utils/amplitude-utils';

interface SearchHeaderProps {
  searchQuery: string;
  handleSearch: (text: string) => void;
  handleSearchSubmit: () => void; // 검색 완료 핸들러
}

const SearchHeader = memo(
  ({searchQuery, handleSearch, handleSearchSubmit}: SearchHeaderProps) => {
    const {theme} = useThemeStore();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const {t} = useTranslation();

    // 검색 시점 분석
    const handleFocus = () => {
      trackEvent('Search_Bar_Activated', {location: 'search'});
    };

    return (
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor:
              theme.THEME_NUMBER === 3 ? theme.MAIN200 : theme.BACKGROUND,
          },
        ]}>
        <TextInput
          style={styles.searchInput}
          onChangeText={handleSearch}
          value={searchQuery}
          placeholder={t('전체에서 검색')}
          placeholderTextColor={theme.TEXT300}
          onSubmitEditing={handleSearchSubmit}
          onFocus={handleFocus} // 포커스 이벤트
          autoFocus={true} // 자동 포커스
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
      paddingVertical: 16,
      paddingHorizontal: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchInput: {
      flex: 1,
      height: 50,
      borderRadius: 8,
      paddingLeft: 16,
      paddingRight: 46,
      paddingVertical: 5,
      color: theme.TEXT800,
      backgroundColor: theme.TEXT200,
      ...FONTS.BODY1_MEDIUM,
    },
    searchIcon: {
      position: 'absolute',
      right: 32,
    },
  });
