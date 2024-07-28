import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
    <SafeAreaView
      edges={['bottom']}
      style={{backgroundColor: isDisabled ? theme.TEXT300 : theme.MAIN400}}>
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
              FONTS.SUBTITLE,
              isDisabled ? {color: theme.TEXT500} : {color: theme.BACKGROUND},
            ]}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomBottomButton;

const styles = StyleSheet.create({
  container: {
    paddingTop: 14,
    paddingBottom: 36,
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
