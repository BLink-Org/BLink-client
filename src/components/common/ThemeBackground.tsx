import React, {useMemo} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {type SvgProps} from 'react-native-svg';
import {useThemeStore} from '@/store/useThemeStore';

const {width, height} = Dimensions.get('screen');

const ThemeBackground = () => {
  const {theme} = useThemeStore();
  const BackgroundImage: React.FC<SvgProps> = useMemo(() => {
    return theme.BACKGROUND_IMAGE;
  }, [theme]);

  return (
    <View style={styles.imageContainer}>
      <BackgroundImage
        height={height}
        width={width}
        preserveAspectRatio="xMidYMid slice"
      />
    </View>
  );
};

export default ThemeBackground;

const styles = StyleSheet.create({
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});
