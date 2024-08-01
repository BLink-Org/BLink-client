import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {type RootStackParamList} from '@/types/navigation';

type WebViewInfoRouteProp = RouteProp<RootStackParamList, 'WebViewInfo'>;

const WebViewInfo = () => {
  const route = useRoute<WebViewInfoRouteProp>();
  const url = route.params.info.url;
  const title = route.params.info.title;

  const navigation = useNavigation();

  const goBackPage = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={goBackPage}>
          <Text style={styles.navButton}>x</Text>
        </TouchableOpacity>
        <View style={styles.centerContainer}>
          <Text>{title}</Text>
        </View>
      </View>
      <WebView source={{uri: url}} style={styles.flexContainer} />
    </SafeAreaView>
  );
};

export default WebViewInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  flexContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  navButton: {
    fontSize: 20,
  },
});
