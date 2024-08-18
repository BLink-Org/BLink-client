import {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useThemeStore} from '@/store/useThemeStore';
import {FONTS} from '@/constants';
import {type ITheme} from '@/types';
import {WarningIcon} from '@/assets/icons/mypage';

const DeletedTrueContainer = () => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <WarningIcon fill={theme.MAIN400} />
        <Text style={styles.headerText}>{t('삭제 신청된 계정입니다.')}</Text>
      </View>
      <Text style={styles.bodyText}>
        {t('계속 이용하시려면 계정 관리 > 삭제 신청을 취소해주세요')}
      </Text>
    </View>
  );
};

export default DeletedTrueContainer;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      padding: 16,
      gap: 8,
      backgroundColor: theme.TEXT100,
    },
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    bodyText: {
      ...FONTS.CAPTION_REGULAR,
      color: theme.TEXT500,
    },
    headerText: {
      ...FONTS.BODY2_MEDIUM,
      color: theme.TEXT900,
    },
  });
