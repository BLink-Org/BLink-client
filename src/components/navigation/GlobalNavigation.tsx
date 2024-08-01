import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {type RootStackParamList} from '@/types/navigation';
import ThemeSetting from '@/screens/stack-screens/ThemeSetting';
import WebViewTest from '@/screens/stack-screens/WebViewTest';
import Support from '@/screens/stack-screens/Support';
import AccountDelete from '@/screens/stack-screens/AccountDelete';
import AccountManage from '@/screens/stack-screens/AccountManage';
import Setting from '@/screens/stack-screens/Setting';
import Trash from '@/screens/stack-screens/Trash';
import WebViewInfo from '@/screens/stack-screens/WebViewInfo';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const GlobalNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={BottomTabNavigation} />
      <Stack.Screen name="ThemeSetting" component={ThemeSetting} />
      <Stack.Screen
        name="WebViewTest"
        component={WebViewTest}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="WebViewInfo"
        component={WebViewInfo}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="AccountDelete" component={AccountDelete} />
      <Stack.Screen name="AccountManage" component={AccountManage} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Trash" component={Trash} />
    </Stack.Navigator>
  );
};

export default GlobalNavigation;
