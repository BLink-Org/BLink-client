import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {type RootStackParamList} from '@/types/navigation';
import ThemeSetting from '@/screens/ThemeSetting';
import WebViewTest from '@/screens/WebViewTest';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const GlobalNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ThemeSetting"
        component={ThemeSetting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WebViewTest"
        component={WebViewTest}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

export default GlobalNavigation;
