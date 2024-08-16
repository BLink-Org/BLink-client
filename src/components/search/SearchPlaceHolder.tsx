import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useThemeStore} from '@/store/useThemeStore';

const SearchPlaceHolder = () => {
  const {theme} = useThemeStore();

  return (
    <SkeletonPlaceholder
      borderRadius={4}
      backgroundColor={theme.TEXT200}
      highlightColor={theme.TEXT100}>
      <View style={styles.container}>
        <View style={{width: 70, height: 27}} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default SearchPlaceHolder;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});
