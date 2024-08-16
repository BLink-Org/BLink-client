import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FONTS} from '@/constants';
import DropdownFilter from '@/components/home/DropDownFilter';
import {LargeCardIcon, SmallCardIcon} from '@/assets/icons/home';
import {type ITheme} from '@/types';
import {useThemeStore} from '@/store/useThemeStore';

interface ListHeaderComponentProps {
  selectedFolderName: string;
  linkCount: number | null;
  sortingOptions: string[];
  selectedSortingOption: string;
  handleSelection: (selected: string) => void;
  isLargeCard: boolean;
  toggleCardSize: () => void;
}

const ListHeaderComponent = ({
  selectedFolderName,
  linkCount,
  sortingOptions,
  selectedSortingOption,
  handleSelection,
  isLargeCard,
  toggleCardSize,
}: ListHeaderComponentProps) => {
  const {theme} = useThemeStore();
  const styles = createStyles(theme);

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{selectedFolderName}</Text>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.linkCount}>{linkCount} Links</Text>
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

export default ListHeaderComponent;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    titleContainer: {
      height: 69,
      justifyContent: 'center',
    },
    title: {
      color: theme.TEXT900,
      ...FONTS.TITLE,
    },
    filterContainer: {
      height: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    linkCount: {
      color: theme.MAIN500,
      ...FONTS.BODY2_MEDIUM,
    },
    sizeIconContainer: {
      marginLeft: 12,
    },
  });
