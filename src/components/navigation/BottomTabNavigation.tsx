import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/Home';
import AddScreen from '@/screens/Add';
import BookmarkScreen from '@/screens/Bookmark';
import MyPageScreen from '@/screens/Mypage';
import {type BottomTabParamList} from '@/types/navigation';
import SampleIcon from '@/assets/bottom-tab/sample.svg';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const TabBarIcon = ({color}: {color: string}) => (
  <SampleIcon width={20} height={20} fill={color} />
);

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: TabBarIcon,
        }}
      />
      <Tab.Screen
        name="add"
        component={AddScreen}
        options={{
          headerShown: false,
          tabBarIcon: TabBarIcon,
        }}
      />
      <Tab.Screen
        name="bookmark"
        component={BookmarkScreen}
        options={{
          headerShown: false,
          tabBarIcon: TabBarIcon,
        }}
      />
      <Tab.Screen
        name="mypage"
        component={MyPageScreen}
        options={{
          headerShown: false,
          tabBarIcon: TabBarIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
