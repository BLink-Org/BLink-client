import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/Home';
import AddScreen from '@/screens/Add';
import BookmarkScreen from '@/screens/Bookmark';
import MyPageScreen from '@/screens/Mypage';
import {BottomTabParamList} from '@/types/navigation';
import SampleIcon from '@/assets/bottom-tab/sample.svg';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const TabBarIcon = () => <SampleIcon fill="black" />;

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: TabBarIcon,
        }}
      />
      <Tab.Screen name="add" component={AddScreen} />
      <Tab.Screen name="bookmark" component={BookmarkScreen} />
      <Tab.Screen name="mypage" component={MyPageScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
