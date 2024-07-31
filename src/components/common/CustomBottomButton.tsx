import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
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
  const {bottom} = useSafeAreaInsets();
  const isHomeIndicatorPresent = Platform.OS === 'ios' && bottom > 0;

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{backgroundColor: isDisabled ? theme.TEXT300 : theme.MAIN400}}>
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        style={[
          styles.container,
          {
            backgroundColor: isDisabled ? theme.TEXT300 : theme.MAIN400,
            paddingBottom: isHomeIndicatorPresent ? 36 : 14,
          },
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
    position: 'absolute',
    bottom: 0,
    paddingTop: 14,
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
