import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useThemeStore} from '@/store/useThemeStore';
import NavigationInfo from '@/components/mypage/NavigationInfo';
import BackHeader from '@/components/common/BackHeader';
import ThemeBackground from '@/components/common/ThemeBackground';
import ModalWebView from '@/components/mypage/ModalWebview';

const Support = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({url: '', title: ''});
  const {theme} = useThemeStore();

  // TODO: 추후, const 폴더로 이동, 파일 링크 수정
  const links = [
    {
      id: 'guide',
      title: '이용 가이드 보기',
      url: 'https://www.example.com/guide',
    },
    {id: 'terms', title: '이용 약관', url: 'https://www.example.com/terms'},
    {
      id: 'privacy',
      title: '개인정보 처리 방침',
      url: 'https://www.example.com/privacy',
    },
    {
      id: 'feedback',
      title: '피드백 보내기 / 도움 요청',
      url: 'https://www.example.com/feedback',
    },
  ];

  const handleOpenLink = (url: string, title: string) => {
    setModalContent({url, title});
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <BackHeader title="지원" themeColor={theme.TEXT900} />
      <View style={styles.contentContainer}>
        {links.map(link => (
          <NavigationInfo
            key={link.id}
            title={link.title}
            themeColor={theme.TEXT800}
            onPress={() => handleOpenLink(link.url, link.title)}
          />
        ))}
      </View>
      <ModalWebView
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        url={modalContent.url}
        title={modalContent.title}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
  },
});

export default Support;
