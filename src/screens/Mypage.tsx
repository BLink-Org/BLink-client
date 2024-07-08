import {Button, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeStore} from '@/store/useThemeStore';
import ThemeBackground from '@/components/common/ThemeBackground';

const Mypage = () => {
  const {theme, setTheme, asyncSetTheme} = useThemeStore();

  const handleSetTheme = (themeNumber: number) => {
    setTheme(themeNumber);
    void asyncSetTheme(themeNumber);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <View style={styles.content}>
        <Button title="Theme 1" onPress={() => handleSetTheme(1)} />
        <Button title="Theme 2" onPress={() => handleSetTheme(2)} />
        <Button title="Theme 3" onPress={() => handleSetTheme(3)} />
        <Button title="Theme 4" onPress={() => handleSetTheme(4)} />
        <Text style={[styles.text, {color: theme.TEXT_COLOR}]}>
          현재 테마 메인 색: {theme.MAIN_COLOR}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Mypage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    marginTop: 20,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
