import {useCallback, useState} from 'react';
import {
  FlatList,
  type ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import {FONTS} from '@/constants';
import DropdownFilter from '@/components/home/DropDownFilter';
import useSortedData from '@/hooks/useSortedData';
import dummyFileData from '@/constants/dummy-data/dummy-file-list.json';
import {type IFileList} from '@/types/home';
import {ArrowBackIcon} from '@/assets/icons/mypage';
import SmallCard from '@/components/home/SmallCard';
import useStickyAnimation from '@/hooks/useStickyAnimation';

const Trash = () => {
  const {theme} = useThemeStore();
  const {t} = useTranslation();
  const navigation = useNavigation();

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

  // sticky header 애니메이션
  const {translateY, handleScroll} = useStickyAnimation(refreshing);

  const handleGoBack = () => {
    navigation.goBack();
  };

  // ListHeaderComponent
  const ListHeaderComponent = () => {
    return (
      <View style={styles.titleContainer}>
        <View style={styles.headerText}>
          <Text style={[FONTS.TITLE, {color: theme.TEXT900}]}>휴지통</Text>
        </View>
        <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT600}]}>
          휴지통의 링크는 7일 이후 영구적으로 삭제됩니다.
        </Text>
        <View style={styles.paddingContent} />
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
          </View>
        </View>
      </View>
    );
  };

  // FlatList 사용 최적화
  const renderItem: ListRenderItem<IFileList> = useCallback(
    ({item, index}) => (
      <View>
        <SmallCard content={item} />
        {index !== sortedData.length - 1 && (
          <View style={[styles.separator, {backgroundColor: theme.TEXT200}]} />
        )}
      </View>
    ),
    [sortedData],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ThemeBackground />
      <View style={styles.mainContainer}>
        <Animated.View
          style={[
            styles.header,
            {
              transform: [{translateY}],
            },
          ]}>
          <TouchableOpacity style={styles.headerIcon} onPress={handleGoBack}>
            <ArrowBackIcon />
          </TouchableOpacity>
        </Animated.View>

        <FlatList
          data={sortedData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={styles.contentContainer}
          initialNumToRender={10}
          onScroll={handleScroll}
          windowSize={10}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressViewOffset={60}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Trash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    marginTop: 58,
  },
  mainContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  contentContainer: {
    paddingHorizontal: 18,
  },
  headerIcon: {
    paddingHorizontal: 18,
    height: 58,
    justifyContent: 'center',
  },
  headerText: {
    height: 69,
    justifyContent: 'center',
  },
  paddingContent: {
    marginTop: 32,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    marginHorizontal: -18,
  },
});
