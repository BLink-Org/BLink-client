import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '@/components/common/BackHeader';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import NavigationInfo from '@/components/mypage/NavigationInfo';
import {type RootStackNavigationProp} from '@/types/navigation';

const Support = () => {
  const {theme} = useThemeStore();
  const navigation = useNavigation<RootStackNavigationProp>();

  const tempUrl =
    'https://shadow-author-bc2.notion.site/i18n-type-39c246cdc9f24753b78282f7bcb51acc?pvs=4';

  // 이용가이드보기 클릭
  const handleGuide = () => {
    navigation.navigate('WebViewInfo', {
      info: {
        url: tempUrl,
        title: '이용 가이드 보기',
      },
    });
  };

  // 이용약관 클릭
  const handleTerms = () => {
    navigation.navigate('WebViewInfo', {
      info: {
        url: tempUrl,
        title: '이용 약관',
      },
    });
  };

  // 개인정보 처리 방침 클릭
  const handlePrivacy = () => {
    navigation.navigate('WebViewInfo', {
      info: {
        url: tempUrl,
        title: '개인정보 처리 방침',
      },
    });
  };

  // 피드백 보내기 / 도움 요청 클릭
  const handleFeedback = () => {
    navigation.navigate('WebViewInfo', {
      info: {
        url: tempUrl,
        title: '피드백 보내기 / 도움 요청 클릭',
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <BackHeader title="지원" themeColor={theme.TEXT900} />
      <View style={styles.contentContainer}>
        <NavigationInfo
          title="이용 가이드 보기"
          themeColor={theme.TEXT800}
          onPress={handleGuide}
        />
        <NavigationInfo
          title="이용 약관"
          themeColor={theme.TEXT800}
          onPress={handleTerms}
        />
        <NavigationInfo
          title="개인정보 처리 방침"
          themeColor={theme.TEXT800}
          onPress={handlePrivacy}
        />
        <NavigationInfo
          title="피드백 보내기 / 도움 요청"
          themeColor={theme.TEXT800}
          onPress={handleFeedback}
        />
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
