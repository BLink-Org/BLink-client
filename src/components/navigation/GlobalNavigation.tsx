import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import {RootStackParamList} from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const GlobalNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        children={BottomTabNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default GlobalNavigation;
