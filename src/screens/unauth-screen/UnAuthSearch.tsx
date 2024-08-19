import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import * as RNLocalize from 'react-native-localize';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import SearchHeader from '@/components/search/SearchHeader';
import {FONTS} from '@/constants';
import {
  type SearchWebViewNavigationProp,
  type ILinkDtos,
  type ITheme,
} from '@/types';
import CustomStatusBar from '@/components/common/CustomStatusBar';
import listData from '@/constants/unauth-default-data.json';
import UnAuthSmallCard from '@/components/home/UnAuthSmallCard';

const UnAuthSearch = () => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {t} = useTranslation();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [finalSearchQuery, setFinalSearchQuery] = useState<string>('');

  const locale = RNLocalize.getLocales()[0].languageCode === 'ko' ? 'KO' : 'EN';
  const linkData: ILinkDtos[] = locale === 'KO' ? [listData[0]] : [listData[1]];

  const navigation = useNavigation<SearchWebViewNavigationProp>();

  const filteredData = useMemo(() => {
    if (!finalSearchQuery) return linkData;
    return linkData.filter(
      item =>
        item.title.toLowerCase().includes(finalSearchQuery.toLowerCase()) ||
        item.contents.toLowerCase().includes(finalSearchQuery.toLowerCase()) ||
        item.url?.toLowerCase().includes(finalSearchQuery.toLowerCase()),
    );
  }, [finalSearchQuery, linkData]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query.trim() === '') {
        setFinalSearchQuery('');
      }
    },
    [setSearchQuery, setFinalSearchQuery],
  );

  const handleSearchSubmit = useCallback(() => {
    if (searchQuery.trim()) {
      setFinalSearchQuery(searchQuery);
    }
  }, [searchQuery]);

  const handleCardPress = () => {
    navigation.navigate('UnAuthWebView');
  };

  const renderItem: ListRenderItem<ILinkDtos> = useCallback(
    ({item}) => (
      <View>
        <TouchableOpacity onPress={handleCardPress}>
          <UnAuthSmallCard content={item} />
        </TouchableOpacity>
      </View>
    ),
    [],
  );

  const renderInitialImage = () => (
    <View style={styles.imageContainer}>
      <Image
        source={require('@/assets/images/img-search.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );

  const renderNoResults = () => (
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
  );

  const renderHeader = useMemo(() => {
    const linkCount = filteredData.length;
    return (
      <View style={styles.headerText}>
        <Text style={styles.headerTextContent}>
          {linkCount} {t('Links')}
        </Text>
      </View>
    );
  }, [filteredData]);

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
          renderInitialImage() // 검색어가 없을 때 이미지 표시
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.contentContainer}
            initialNumToRender={10}
            ListEmptyComponent={renderNoResults}
            windowSize={10}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default UnAuthSearch;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    centerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 100,
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
