import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useThemeStore} from '@/store/useThemeStore';

const LargeCardPlaceHolder = () => {
  const {theme} = useThemeStore();

  return (
    <View style={styles.topContainer}>
      <SkeletonPlaceholder
        borderRadius={4}
        backgroundColor={theme.TEXT200}
        highlightColor={theme.TEXT100}>
        <View>
          <View style={styles.container}>
            <View style={{height: 140}} />
          </View>
          <View style={styles.bodyContainer}>
            <View style={{height: 24, width: 42}} />
            <View style={{height: 27, width: 198}} />
          </View>
          <View style={styles.footerContainer}>
            <View style={styles.footerText}>
              <View style={{height: 21, width: 73}} />
              <View style={{height: 21, width: 73}} />
            </View>
            <View style={{height: 24, width: 24}} />
          </View>
        </View>
      </SkeletonPlaceholder>

      <View style={styles.threeDots}>
        <View style={[styles.dot, {backgroundColor: theme.TEXT300}]} />
        <View style={[styles.dot, {backgroundColor: theme.TEXT300}]} />
        <View style={[styles.dot, {backgroundColor: theme.TEXT300}]} />
      </View>
    </View>
  );
};

export default LargeCardPlaceHolder;

const styles = StyleSheet.create({
  topContainer: {
    height: 272,
  },
  container: {
    marginTop: 20,
  },
  threeDots: {
    position: 'absolute',
    top: 34,
    right: 12.67,
    height: 16.67,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dot: {
    width: 3.33,
    height: 3.33,
    borderRadius: 2,
  },
  bodyContainer: {
    marginTop: 12,
    gap: 4,
  },
  footerContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    flexDirection: 'row',
    gap: 12,
  },
});
