import React, {useMemo} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {useModalStore} from '@/store/useModalStore';
import AlertModal from '@/components/modal/AlertModal';
import {type ITheme} from '@/types';

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

  const {showModal, closeModal} = useModalStore();
  const modalId = `themeConfirm-${id}`;

  const handleSelect = () => {
    showModal(modalId);
  };

  const handleConfirmSelect = () => {
    onSelect();
    closeModal(modalId);
  };

  return (
    <TouchableOpacity onPress={handleSelect} style={styles.mainContainer}>
      <View
        style={[
          styles.card,
          selected
            ? {borderColor: theme.MAIN400}
            : {borderColor: theme.TEXT200},
        ]}>
        <View style={[styles.headerBackground, {backgroundColor: mainColor}]} />
        <View style={styles.bodyContainer}>
          <View style={styles.textBox}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.priceText}>{price}</Text>
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
        headerText="선택한 테마를 적용하시겠어요?"
        bodyText="테마는 즉시 적용돼요"
        leftText="취소"
        rightText="적용"
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
