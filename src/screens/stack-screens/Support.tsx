import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useThemeStore} from '@/store/useThemeStore';
import NavigationInfo from '@/components/mypage/NavigationInfo';
import BackHeader from '@/components/common/BackHeader';
import ThemeBackground from '@/components/common/ThemeBackground';
import ModalWebView from '@/components/mypage/ModalWebview';
import {LINK_INFOS} from '@/constants/links';

const Support = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({url: '', title: ''});
  const {theme} = useThemeStore();

  const handleOpenLink = (url: string, title: string) => {
    setModalContent({url, title});
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <BackHeader title="지원" themeColor={theme.TEXT900} />
      <View style={styles.contentContainer}>
        {LINK_INFOS.map(link => (
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
