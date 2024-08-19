import {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useThemeStore} from '@/store/useThemeStore';
import {FONTS} from '@/constants';
import {type ITheme} from '@/types';

interface StaticInfoProps {
  linkCount: number | undefined;
  bookmarkCount: number | undefined;
  folderCount: number | undefined;
}

const StaticInfo = ({
  linkCount,
  bookmarkCount,
  folderCount,
}: StaticInfoProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.content}>
          <Text style={styles.linkCount}>{linkCount}</Text>
          <Text style={styles.linkText}>{t('링크')}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.linkCount}>{bookmarkCount}</Text>
          <Text style={styles.linkText}>{t('핀')}</Text>
        </View>
        <View style={[styles.content, styles.lastContent]}>
          <Text style={styles.linkCount}>{folderCount}</Text>
          <Text style={styles.linkText}>{t('폴더')}</Text>
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
