import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useThemeStore} from '@/store/useThemeStore';
import {FONTS} from '@/constants';

interface BottomCustomButtonProps {
  title: string;
  onPress: () => void;
  isDisabled?: boolean;
}

const CustomBottomButton = ({
  title,
  onPress,
  isDisabled,
}: BottomCustomButtonProps) => {
  const {theme} = useThemeStore();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.container,
        isDisabled
          ? {backgroundColor: theme.TEXT300}
          : {backgroundColor: theme.MAIN400},
      ]}>
      <View style={styles.buttonContent}>
        <Text
          style={[
            FONTS.BODY1_MEDIUM,
            isDisabled ? {color: theme.TEXT500} : {color: theme.BACKGROUND},
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomBottomButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginRight: 1,
  },
  buttonContent: {
    width: '100%',
    alignItems: 'center',
  },
});
