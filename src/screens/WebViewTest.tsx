import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Share,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import TestModal from '@/components/modal/TestModal';
import type {WebViewNavigation} from 'react-native-webview';

const webViews: string[] = [
  'https://www.naver.com',
  'https://www.google.com',
  'https://www.youtube.com',
  'https://www.gmail.com',
  'https://www.wikipedia.org',
];

// 추후 util 폴더로..!
const extractHostname = (url: string) => {
  let hostname;
  if (url.includes('//')) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }
  hostname = hostname.split(':')[0];
  hostname = hostname.split('?')[0];
  return hostname;
};

const WebViewList = () => {
  const navigation = useNavigation();
  const webViewRef = useRef<WebView>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentUrl, setCurrentUrl] = useState<string>(webViews[currentIndex]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const goBackPage = () => {
    navigation.goBack();
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goForward = () => {
    if (currentIndex < webViews.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const reloadPage = () => {
    webViewRef.current?.reload();
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCurrentUrl(navState.url);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const shareUrl = () => {
    Share.share({
      message: `Check out this website: ${currentUrl}`,
      url: currentUrl,
    }).catch(error => {
      console.error('Error sharing: ', error.message);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={goBackPage}>
          <Text style={styles.navButton}>Back</Text>
        </TouchableOpacity>
        <View style={styles.urlTextHolder}>
          <Text style={styles.urlText}>{extractHostname(currentUrl)}</Text>
          {/* <Text style={styles.urlText}>{currentUrl}</Text> */}
        </View>
        <TouchableOpacity onPress={reloadPage}>
          <Text style={styles.navButton}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <WebView
        ref={webViewRef}
        source={{uri: webViews[currentIndex]}}
        style={styles.webView}
        onNavigationStateChange={handleNavigationStateChange}
      />
      <View style={styles.buttonContainer}>
        <Button title="공유" onPress={shareUrl} />
        <Button title="저장" onPress={openModal} />
        <Button title="<" onPress={goBack} disabled={currentIndex === 0} />
        <Button
          title=">"
          onPress={goForward}
          disabled={currentIndex === webViews.length - 1}
        />
      </View>

      {/* 임시 저장모달  */}
      <TestModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        currentUrl={currentUrl}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  buttonContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  urlText: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
  },
  navButton: {
    color: 'blue',
  },
  urlTextHolder: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 2,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
});

export default WebViewList;
