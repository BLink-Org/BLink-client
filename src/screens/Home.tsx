import React, {useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  RefreshControl,
  type ListRenderItem,
} from 'react-native';
import {FONTS} from '@/constants';
import ThemeBackground from '@/components/common/ThemeBackground';
import ScreenHeader from '@/components/common/ScreenHeader';
import {useThemeStore} from '@/store/useThemeStore';
import {LargeCardIcon, SmallCardIcon} from '@/assets/icons/home';
import LargeCard from '@/components/home/LargeCard';
import SmallCard from '@/components/home/SmallCard';
import DropdownFilter from '@/components/home/DropDownFilter';
import dummyFileData from '@/constants/dummy-data/dummy-file-list.json';
import useSortedData from '@/hooks/useSortedData';
import {type IFileList} from '@/types/home';

const Home = () => {
  const {t} = useTranslation();
  const {theme} = useThemeStore();

  const sortingOptions = [
    t('최근 저장순'),
    t('과거 저장순'),
    t('제목순 (A-ㅎ)'),
    t('제목순 (ㅎ-A)'),
  ];

  const [selectedSortingOption, setSelectedSortingOption] = useState(
    sortingOptions[0],
  );
  const handleSelection = (selected: string) => {
    setSelectedSortingOption(selected);
  };

  // sort 커스텀 훅
  const sortedData = useSortedData(dummyFileData, selectedSortingOption);

  // 카드 사이즈 조절
  const [isLargeCard, setIsLargeCard] = useState(true);
  const toggleCardSize = () => {
    setIsLargeCard(prevState => !prevState);
  };

  // 새로고침 상태 관리
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // 여기서 데이터를 새로 고침
    // 추후 API 호출로 변경
    // 예시로 1초 후 새로고침 완료
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // FlatList Header 영역
  const ListHeaderComponent = () => {
    return (
      <>
        <View style={styles.titleContainer}>
          <Text style={[FONTS.TITLE, {color: theme.TEXT900}]}>전체</Text>
        </View>
        <View style={styles.filterContainer}>
          <Text style={[FONTS.BODY2_MEDIUM, {color: theme.MAIN500}]}>
            123 Links
          </Text>
          <View style={styles.filterContainer}>
            <DropdownFilter
              options={sortingOptions}
              selectedOption={selectedSortingOption}
              onSelect={handleSelection}
            />
            <TouchableOpacity
              style={styles.sizeIconContainer}
              onPress={toggleCardSize}>
              {isLargeCard ? (
                <LargeCardIcon stroke={theme.TEXT700} />
              ) : (
                <SmallCardIcon stroke={theme.TEXT700} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  // FlatList 사용 최적화
  const renderItem: ListRenderItem<IFileList> = useCallback(
    ({item, index}) => (
      <View>
        {isLargeCard ? (
          <LargeCard content={item} />
        ) : (
          <SmallCard content={item} />
        )}
        {index !== sortedData.length - 1 && (
          <View style={[styles.separator, {backgroundColor: theme.TEXT200}]} />
        )}
      </View>
    ),
    [isLargeCard, sortedData, theme.TEXT200],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <ScreenHeader />
      <FlatList
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={ListHeaderComponent}
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

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
  },
  titleContainer: {
    height: 69,
    justifyContent: 'center',
  },
  filterContainer: {
    height: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sizeIconContainer: {
    marginLeft: 12,
  },
  separator: {
    height: 1,
    marginHorizontal: -18,
  },
});
