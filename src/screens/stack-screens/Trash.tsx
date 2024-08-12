import {useCallback, useState, useMemo} from 'react';
import {
  FlatList,
  type ListRenderItem,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
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
import {type ITheme} from '@/types';

const Trash = () => {
  const {t} = useTranslation();
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

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

  const sortedData = useSortedData(dummyFileData, selectedSortingOption);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const {translateY, handleScroll} = useStickyAnimation(refreshing);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderItem: ListRenderItem<IFileList> = useCallback(
    ({item, index}) => (
      <View>
        <SmallCard content={item} isTrash={true} />
        {index !== sortedData.length - 1 && <View style={styles.separator} />}
      </View>
    ),
    [sortedData, styles.separator],
  );

  const ListHeaderComponent = () => {
    return (
      <View style={styles.titleContainer}>
        <View style={styles.headerText}>
          <Text style={styles.title}>휴지통</Text>
        </View>
        <Text style={styles.subTitle}>
          휴지통의 링크는 7일 이후 영구적으로 삭제됩니다.
        </Text>
        <View style={styles.paddingContent} />
        <View style={styles.filterContainer}>
          <Text style={styles.linkCount}>123 Links</Text>
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
            <ArrowBackIcon fill={theme.TEXT900} />
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

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: theme.BACKGROUND,
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
      backgroundColor: theme.TEXT200,
    },
    title: {
      color: theme.TEXT900,
      ...FONTS.TITLE,
    },
    subTitle: {
      color: theme.TEXT600,
      ...FONTS.BODY2_REGULAR,
    },
    linkCount: {
      color: theme.MAIN500,
      ...FONTS.BODY2_MEDIUM,
    },
  });
