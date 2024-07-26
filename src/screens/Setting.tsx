import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import BackHeader from '@/components/common/BackHeader';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';

const Setting = () => {
  const {theme} = useThemeStore();
  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <BackHeader title="환경 설정" themeColor={theme.TEXT900} />
      <View style={styles.contentContainer}>
        <Text>page</Text>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
  },
});
