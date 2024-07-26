import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';

const Trash = () => {
  const {theme} = useThemeStore();
  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <BackHeader title="휴지통" themeColor={theme.TEXT900} />
      <View style={styles.contentContainer}>
        <Text>page</Text>
      </View>
    </SafeAreaView>
  );
};

export default Trash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
  },
});
