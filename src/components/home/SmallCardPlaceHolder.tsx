import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useThemeStore} from '@/store/useThemeStore';
import {PinnedUnselectedIcon} from '@/assets/icons/webview';

const SmallCardPlaceHolder = () => {
  const {theme} = useThemeStore();

  return (
    <View>
      <SkeletonPlaceholder
        borderRadius={4}
        backgroundColor={theme.TEXT200}
        highlightColor={theme.TEXT100}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{width: 42, height: 24}} />
            <View style={styles.threeDots}>
              <View style={{width: 3.33, height: 3.33, borderRadius: 2}} />
              <View style={{width: 3.33, height: 3.33, borderRadius: 2}} />
              <View style={{width: 3.33, height: 3.33, borderRadius: 2}} />
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.textContainer}>
              <View style={{width: 198, height: 27}} />
              <View style={{width: 240, height: 41}} />
            </View>
            <View style={{width: 76, height: 76}} />
          </View>
          <View style={styles.footer}>
            <View style={styles.footerText}>
              <View style={{width: 73, height: 21}} />
              <View style={{width: 73, height: 21}} />
            </View>
            <PinnedUnselectedIcon
              width={20}
              height={20}
              stroke={theme.TEXT400}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default SmallCardPlaceHolder;

const styles = StyleSheet.create({
  container: {
    height: 169,
    gap: 8,
  },
  header: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  threeDots: {
    height: 16.67,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
  },
  textContainer: {
    gap: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    flexDirection: 'row',
    gap: 12,
  },
});
