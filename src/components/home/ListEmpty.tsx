import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useThemeStore} from '@/store/useThemeStore';
import {FONTS} from '@/constants';

interface ListEmptyProps {
  textColor: string;
  message: string;
}

const ListEmpty = ({textColor, message}: ListEmptyProps) => {
  const {theme} = useThemeStore();
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Image source={theme.EMPTY_IMAGE} style={styles.logoImage} />

      <Text style={[styles.text, {color: textColor}]}>{t(message)}</Text>
    </View>
  );
};

export default ListEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 120,
  },
  logoImage: {
    width: 220,
    height: 220,
  },
  text: {
    ...FONTS.BODY2_MEDIUM,
  },
});
