import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useThemeStore} from '@/store/useThemeStore';
import {FONTS} from '@/constants';

interface StaticInfoProps {
  linkCount: number;
  bookmarkCount: number;
  folderCount: number;
}

const StaticInfo = ({
  linkCount,
  bookmarkCount,
  folderCount,
}: StaticInfoProps) => {
  const {theme} = useThemeStore();

  return (
    <View style={[styles.container, {backgroundColor: theme.TEXT100}]}>
      <View style={styles.infoContainer}>
        <View style={[styles.content, {borderColor: theme.TEXT200}]}>
          <Text style={[FONTS.BODY1_SEMIBOLD, {color: theme.TEXT700}]}>
            {linkCount}
          </Text>
          <Text style={[FONTS.BODY2_MEDIUM, {color: theme.MAIN500}]}>링크</Text>
        </View>

        <View style={[styles.content, {borderColor: theme.TEXT200}]}>
          <Text style={[FONTS.BODY1_SEMIBOLD, {color: theme.TEXT700}]}>
            {bookmarkCount}
          </Text>
          <Text style={[FONTS.BODY2_MEDIUM, {color: theme.MAIN500}]}>
            북마크
          </Text>
        </View>
        <View style={[styles.content, {borderRightWidth: 0}]}>
          <Text style={[FONTS.BODY1_SEMIBOLD, {color: theme.TEXT700}]}>
            {folderCount}
          </Text>
          <Text style={[FONTS.BODY2_MEDIUM, {color: theme.MAIN500}]}>폴더</Text>
        </View>
      </View>
    </View>
  );
};

export default StaticInfo;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    borderRightWidth: 1,
  },
});
