import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/Home';
import AddScreen from '@/screens/Add';
import BookmarkScreen from '@/screens/Bookmark';
import MyPageScreen from '@/screens/Mypage';
import SearchScreen from '@/screens/Search';
import {type BottomTabParamList} from '@/types/navigation';
import {
  HomeIcon,
  BookmarkIcon,
  LinkIcon,
  MypageIcon,
  SearchIcon,
} from '@/assets/icons/bottom-tab';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const HomeBarIcon = ({color}: {color: string}) => <HomeIcon fill={color} />;
const BookmarkBarIcon = ({color}: {color: string}) => (
  <BookmarkIcon fill={color} />
);
const AddBarIcon = ({color}: {color: string}) => <LinkIcon fill={color} />;
const SearchBarIcon = ({color}: {color: string}) => <SearchIcon fill={color} />;
const MyPageBarIcon = ({color}: {color: string}) => <MypageIcon fill={color} />;

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: HomeBarIcon,
        }}
      />
      <Tab.Screen
        name="bookmark"
        component={BookmarkScreen}
        options={{
          headerShown: false,
          tabBarIcon: BookmarkBarIcon,
        }}
      />
      <Tab.Screen
        name="add"
        component={AddScreen}
        options={{
          headerShown: false,
          tabBarIcon: AddBarIcon,
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: SearchBarIcon,
        }}
      />

      <Tab.Screen
        name="mypage"
        component={MyPageScreen}
        options={{
          headerShown: false,
          tabBarIcon: MyPageBarIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
