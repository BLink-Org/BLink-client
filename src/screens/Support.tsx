import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';

const Support = () => {
  const {theme} = useThemeStore();
  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <BackHeader title="지원" themeColor={theme.TEXT900} />
      <View style={styles.contentContainer}>
        <Text>page</Text>
      </View>
    </SafeAreaView>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
  },
});
