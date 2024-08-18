import React, {useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  type ListRenderItem,
  View,
} from 'react-native';
import {FONTS} from '@/constants';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import {LargeCardIcon, SmallCardIcon} from '@/assets/icons/home';
import LargeCard from '@/components/home/LargeCard';
import SmallCard from '@/components/home/SmallCard';
import DropdownFilter from '@/components/home/DropDownFilter';
import dummyFileData from '@/constants/dummy-data/dummy-file-list.json';
import ScreenHeader from '@/components/home/ScreenHeader';
import {getSortByValue, getSortingOptions} from '@/utils/sorting-utils';
import {type ILinkDtos} from '@/types';
import HomeListHeader from '@/components/home/HomeListHeader';

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
  const [isLargeCard, setIsLargeCard] = useState(true);
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

  // FlatList Header 영역

  const linkInfoArgsOptions = {
    folderId: -1,
    size: 10,
    sortBy: getSortByValue(t, selectedSortingOption),
  };

  // FlatList 사용 최적화
  const renderItem: ListRenderItem<ILinkDtos> = useCallback(
    ({item, index}) => (
      <View>
        {isLargeCard ? (
          <LargeCard content={item} linkInfoArgs={linkInfoArgsOptions} />
        ) : (
          <SmallCard content={item} linkInfoArgs={linkInfoArgsOptions} />
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
