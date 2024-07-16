import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FONTS} from '@/constants';
import ThemeBackground from '@/components/common/ThemeBackground';
import ScreenHeader from '@/components/common/ScreenHeader';
import {useThemeStore} from '@/store/useThemeStore';
import {LargeCardIcon} from '@/assets/icons/home';
import LargeCard from '@/components/home/LargeCard';
import DropdownFilter from '@/components/home/DropDownFilter';
import dummyFileData from '@/constants/dummy-data/dummy-file-list.json';
import useSortedData from '@/hooks/useSortedData';

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

  // sort 커스텀 훅
  const sortedData = useSortedData(dummyFileData, selectedSortingOption);

  const handleSelection = (selected: string) => {
    setSelectedSortingOption(selected);
    console.log(selected);
  };

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
            <TouchableOpacity style={styles.sizeIconContainer}>
              <LargeCardIcon stroke={theme.TEXT700} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <ScreenHeader />
      <FlatList
        data={sortedData}
        renderItem={({item, index}) => (
          <View>
            <LargeCard content={item} />
            {index !== sortedData.length - 1 && (
              <View
                style={[styles.separator, {backgroundColor: theme.TEXT200}]}
              />
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.contentContainer}
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
