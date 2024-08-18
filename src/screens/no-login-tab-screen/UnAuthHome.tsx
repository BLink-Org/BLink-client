import React, {useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  type ListRenderItem,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import dummyFileData from '@/constants/unauth-default-data.json';
import ScreenHeader from '@/components/home/ScreenHeader';
import {getSortingOptions} from '@/utils/sorting-utils';
import {type WebViewListNavigationProp, type ILinkDtos} from '@/types';
import HomeListHeader from '@/components/home/HomeListHeader';
import UnAuthLargeCard from '@/components/home/UnAuthLargeCard';
import UnAuthSmallCard from '@/components/home/UnAuthSmallCard';

const UnAuthHome = () => {
  const {t} = useTranslation();
  const {theme} = useThemeStore();

  const sortingOptions = getSortingOptions(t);
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    sortingOptions[0],
  );
  const handleSelection = (selected: string) => {
    setSelectedSortingOption(selected);
  };

  const sortedData: ILinkDtos[] = dummyFileData;

  // 카드 사이즈 조절
  const [isLargeCard, setIsLargeCard] = useState(false);
  const toggleCardSize = () => {
    setIsLargeCard(prevState => !prevState);
  };

  // 새로고침 상태 관리
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 300);
  }, []);

  const navigation = useNavigation<WebViewListNavigationProp>();
  const handleCardPress = () => {
    navigation.navigate('UnAuthWebView');
  };

  const renderItem: ListRenderItem<ILinkDtos> = useCallback(
    ({item, index}) => (
      <View>
        {isLargeCard ? (
          <UnAuthLargeCard content={item} />
        ) : (
          <TouchableOpacity onPress={handleCardPress}>
            <UnAuthSmallCard content={item} />
          </TouchableOpacity>
        )}
      </View>
    ),
    [isLargeCard, sortedData, theme.TEXT200],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <ScreenHeader toggleSideBar={() => {}} />
      <FlatList
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <HomeListHeader
            selectedFolderName={'전체'}
            linkCount={1}
            sortingOptions={sortingOptions}
            selectedSortingOption={selectedSortingOption}
            handleSelection={handleSelection}
            isLargeCard={isLargeCard}
            toggleCardSize={toggleCardSize}
          />
        }
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={10}
        windowSize={10}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default UnAuthHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
  },
});
