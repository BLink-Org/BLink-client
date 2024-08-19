import React, {useMemo} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {useModalStore} from '@/store/useModalStore';
import AlertModal from '@/components/modal/AlertModal';
import {type ITheme} from '@/types';
import {Theme3SmallCardImage} from '@/assets/icons/theme';

interface ThemeCardProps {
  id: number;
  name: string;
  price: string;
  mainColor: string;
  onSelect: () => void;
  selected: boolean;
}

const ThemeCard = ({
  id,
  name,
  price,
  mainColor,
  onSelect,
  selected,
}: ThemeCardProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {t} = useTranslation();

  const {showModal, closeModal} = useModalStore();
  const modalId = `themeConfirm-${id}`;

  const handleSelect = () => {
    showModal(modalId);
  };

  const handleConfirmSelect = () => {
    onSelect();
    closeModal(modalId);
  };

  if (id === 4) {
    return <View style={styles.mainContainer}></View>;
  }

  return (
    <TouchableOpacity onPress={handleSelect} style={styles.mainContainer}>
      <View
        style={[
          styles.card,
          selected
            ? {borderColor: theme.MAIN400}
            : {borderColor: theme.TEXT300},
        ]}>
        {id === 3 ? (
          <View style={styles.headerBackground}>
            <Theme3SmallCardImage width={180} height={180} />
          </View>
        ) : (
          <View
            style={[styles.headerBackground, {backgroundColor: mainColor}]}
          />
        )}

        <View style={styles.bodyContainer}>
          <View style={styles.textBox}>
            <Text style={styles.nameText}>{t(name)}</Text>
            <Text style={styles.priceText}>{t(price)}</Text>
          </View>
          {selected ? (
            <View style={styles.buttonContainer}>
              <View style={styles.doubleCircle} />
              <View style={styles.innerCircle} />
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <View style={styles.unSelectedCircle} />
            </View>
          )}
        </View>
      </View>

      {/* alertModal 처리 */}
      <AlertModal
        modalId={modalId}
        headerText={t('선택한 테마를 적용하시겠어요?')}
        bodyText={t('테마는 즉시 적용돼요')}
        leftText={t('취소')}
        rightText={t('적용')}
        rightOnPress={handleConfirmSelect}
      />
    </TouchableOpacity>
  );
};

export default ThemeCard;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    card: {
      marginHorizontal: 6,
      borderRadius: 8,
      borderWidth: 1,
      overflow: 'hidden',
    },

    headerBackground: {
      height: 140,
      width: '100%',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bodyContainer: {
      padding: 12,
      gap: 8,
    },
    textBox: {
      gap: 4,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    doubleCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.MAIN400,
    },
    innerCircle: {
      position: 'absolute',
      right: 8,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.MAIN500,
    },
    unSelectedCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.TEXT300,
    },
    nameText: {
      color: theme.TEXT800,
      ...FONTS.BODY1_MEDIUM,
    },
    priceText: {
      color: theme.TEXT600,
      ...FONTS.BODY2_REGULAR,
    },
  });
