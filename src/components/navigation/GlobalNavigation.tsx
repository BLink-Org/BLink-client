import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {type RootStackParamList} from '@/types/navigation';
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
    </Stack.Navigator>
  );
};

export default GlobalNavigation;
