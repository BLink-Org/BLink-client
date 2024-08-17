import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PinnedIcon} from '@/assets/icons/bottom-tab';
import {
  ArrowBackIcon,
  RefreshIcon,
  ShareIcon,
  ContentBackIcon,
  ContentFrontIcon,
} from '@/assets/icons/webview';
import NavigationButton from '@/components/webview/NavigationButton';
import {extractHostname, shareUrl} from '@/utils/url-utils';
import {useThemeStore} from '@/store/useThemeStore';
import BottomSheet from '@/components/modal/BottomSheet';
import LinkContent from '@/components/link/LinkContent';

interface WebViewContainerProps {
  currentUrl: string;
  handlePinToggle: () => void;
  currentLink: any;
  goBack: () => void;
  goForward: () => void;
  directBack: () => void;
  directFront: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  webViewRef: React.RefObject<WebView>;
}

const WebViewContainer = ({
  currentUrl,
  handlePinToggle,
  currentLink,
  goBack,
  goForward,
  directBack,
  directFront,
  canGoBack,
  canGoForward,
  webViewRef,
}: WebViewContainerProps) => {
  const {theme} = useThemeStore();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };

  const [webViewKey, setWebViewKey] = useState<number>(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={goBack}>
          <ArrowBackIcon fill={theme.TEXT900} />
        </TouchableOpacity>
        <View style={styles.urlTextHolder}>
          <Text style={[{color: theme.TEXT700}]}>
            {extractHostname(currentUrl)}
          </Text>
        </View>
        <TouchableOpacity onPress={() => webViewRef.current?.reload()}>
          <RefreshIcon fill={theme.TEXT900} />
        </TouchableOpacity>
      </View>

      <WebView
        ref={webViewRef}
        key={webViewKey}
        source={{uri: currentUrl}}
        style={styles.webViewContainer}
      />

      <View style={styles.backForwardButton}>
        <NavigationButton
          onPress={directBack}
          disabled={!canGoBack}
          label="뒤로가기"
        />
        <NavigationButton
          onPress={directFront}
          disabled={!canGoForward}
          label="앞으로가기"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={directBack} disabled={!canGoBack}>
          <ContentBackIcon fill={canGoBack ? theme.TEXT700 : theme.TEXT300} />
        </TouchableOpacity>
        <TouchableOpacity onPress={directFront} disabled={!canGoForward}>
          <ContentFrontIcon
            fill={canGoForward ? theme.TEXT700 : theme.TEXT300}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => shareUrl(currentUrl)}>
          <ShareIcon fill={theme.TEXT900} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePinToggle}>
          <PinnedIcon
            width={30}
            height={30}
            strokeWidth={1.6}
            fill={currentLink.pinned ? theme.TEXT900 : 'transparent'}
            stroke={theme.TEXT900}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleBottomSheet}>
          <RefreshIcon fill={theme.TEXT900} />
        </TouchableOpacity>
      </View>

      <BottomSheet
        modalTitle="링크 저장"
        isBottomSheetVisible={isBottomSheetVisible}
        toggleBottomSheet={toggleBottomSheet}>
        <LinkContent
          defaultURL={currentUrl}
          toggleBottomSheet={toggleBottomSheet}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

export default WebViewContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    paddingVertical: 8,
    paddingBottom: 4,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  webViewContainer: {
    flex: 1,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 18,
    gap: 12,
    alignItems: 'center',
  },
  urlTextHolder: {
    flex: 1,
    height: 37,
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  backForwardButton: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 18,
    alignItems: 'center',
    gap: 16,
  },
});
