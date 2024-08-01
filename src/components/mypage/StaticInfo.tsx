import {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useThemeStore} from '@/store/useThemeStore';
import {FONTS} from '@/constants';
import {type ITheme} from '@/types';

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
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.content}>
          <Text style={styles.linkCount}>{linkCount}</Text>
          <Text style={styles.linkText}>링크</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.linkCount}>{bookmarkCount}</Text>
          <Text style={styles.linkText}>북마크</Text>
        </View>
        <View style={[styles.content, styles.lastContent]}>
          <Text style={styles.linkCount}>{folderCount}</Text>
          <Text style={styles.linkText}>폴더</Text>
        </View>
      </View>
    </View>
  );
};

export default StaticInfo;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      paddingVertical: 16,
      backgroundColor: theme.TEXT100,
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
      borderColor: theme.TEXT200,
    },
    lastContent: {
      borderRightWidth: 0,
    },
    linkCount: {
      ...FONTS.BODY1_SEMIBOLD,
      color: theme.TEXT700,
    },
    linkText: {
      ...FONTS.BODY2_MEDIUM,
      color: theme.MAIN500,
    },
  });
