import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, Easing, TouchableHighlight} from 'react-native';
import {useThemeStore} from '@/store/useThemeStore';

interface CustomToggleProps {
  isToggled?: boolean; // 초기 토글 상태
  onToggleChange?: (state: boolean) => void; // 토글 상태 변경 이벤트
}

const CustomToggle = ({
  isToggled = false,
  onToggleChange,
}: CustomToggleProps) => {
  const {theme} = useThemeStore();
  const [isOn, setIsOn] = useState(isToggled);
  const translateX = useState(new Animated.Value(isOn ? 9.5 : -9.5))[0];

  useEffect(() => {
    setIsOn(isToggled);
    Animated.timing(translateX, {
      toValue: isToggled ? 9.5 : -9.5,
      duration: 200,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [isToggled]);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggleChange) {
      onToggleChange(newState);
    }

    Animated.timing(translateX, {
      toValue: newState ? 9.5 : -9.5,
      duration: 200,
      easing: Easing.inOut(Easing.linear),
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableHighlight
      style={[
        styles.toggleButton,
        {backgroundColor: isOn ? theme.MAIN500 : theme.TEXT400},
      ]}
      onPress={handleToggle}
      underlayColor={isOn ? theme.MAIN500 : theme.TEXT400}>
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{translateX}],
            backgroundColor: theme.BACKGROUND,
          },
        ]}
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    width: 44,
    height: 24,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 1,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default CustomToggle;
