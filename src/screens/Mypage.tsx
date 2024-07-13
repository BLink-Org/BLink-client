import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Button} from 'react-native';
import {type RootStackNavigationProp} from '@/types/navigation';

const MyPage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="테마 설정"
        onPress={() => navigation.navigate('ThemeSetting')}
      />
      <Button
        title="WebViewTest"
        onPress={() => navigation.navigate('WebViewTest')}
      />
    </View>
  );
};

export default MyPage;
