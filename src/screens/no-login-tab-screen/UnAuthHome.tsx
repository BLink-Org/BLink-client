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
import * as RNLocalize from 'react-native-localize';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import dummyFileData from '@/constants/unauth-default-data.json';
import ScreenHeader from '@/components/home/ScreenHeader';
import {getSortingOptions} from '@/utils/sorting-utils';
import {type WebViewListNavigationProp, type ILinkDtos} from '@/types';
import HomeListHeader from '@/components/home/HomeListHeader';
import UnAuthLargeCard from '@/components/home/UnAuthLargeCard';
import UnAuthSmallCard from '@/components/home/UnAuthSmallCard';
import UnAuthFolderSideBar from '@/components/modal/UnAuthFolderSideBar';

const UnAuthHome = () => {
  const {t} = useTranslation();
  const {theme} = useThemeStore();

  const locale = RNLocalize.getLocales()[0].languageCode === 'ko' ? 'KO' : 'EN';

  const sortingOptions = getSortingOptions(t);
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    sortingOptions[0],
  );
  const handleSelection = (selected: string) => {
    setSelectedSortingOption(selected);
  };

  const sortedData: ILinkDtos[] =
    locale === 'KO' ? [dummyFileData[0]] : [dummyFileData[1]];

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

  // 폴더 사이드바 토글
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  const navigation = useNavigation<WebViewListNavigationProp>();
  const handleCardPress = () => {
    navigation.navigate('UnAuthWebView');
  };

  const renderItem: ListRenderItem<ILinkDtos> = useCallback(
    ({item, index}) => (
      <View>
        {isLargeCard ? (
          <TouchableOpacity onPress={handleCardPress}>
            <UnAuthLargeCard content={item} />
          </TouchableOpacity>
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
      <ScreenHeader toggleSideBar={toggleSideBar} />
      <FlatList
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <HomeListHeader
            selectedFolderName={t('전체')}
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
      <UnAuthFolderSideBar
        isSideBarVisible={isSideBarVisible}
        toggleSideBar={toggleSideBar}
        selectedFolderId={[0]}
        setSelectedFolderId={() => {}}
        setSelectedFolderName={() => {}}
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
