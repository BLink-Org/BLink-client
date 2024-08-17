import {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, TouchableOpacity} from 'react-native';
import {
  HomeIcon,
  PinnedIcon,
  LinkIcon,
  MypageIcon,
  SearchIcon,
  SearchUnfocusedIcon,
} from '@/assets/icons/bottom-tab';
import {type BottomTabParamList} from '@/types/navigation';
import HomeScreen from '@/screens/tab-screens/Home';
import AddScreen from '@/screens/tab-screens/Add';
import BookmarkScreen from '@/screens/tab-screens/Bookmark';
import SearchScreen from '@/screens/tab-screens/Search';
import MyPageScreen from '@/screens/tab-screens/Mypage';
import BottomSheet from '@/components/modal/BottomSheet';
import LinkContent from '@/components/link/LinkContent';
import {useThemeStore} from '@/store/useThemeStore';
import {type Theme} from '@/constants/theme';

const Tab = createBottomTabNavigator<BottomTabParamList>();

interface IconProps {
  focused: boolean;
  theme: Theme;
}

const HomeBarIcon = ({focused, theme}: IconProps) => (
  <HomeIcon
    strokeWidth={1.5}
    fill={
      focused
        ? theme.THEME_NUMBER === 3
          ? theme.BACKGROUND
          : theme.TEXT900
        : 'transparent'
    }
    stroke={theme.THEME_NUMBER === 3 ? theme.BACKGROUND : theme.TEXT900}
  />
);

const PinnedBarIcon = ({focused, theme}: IconProps) => (
  <PinnedIcon
    strokeWidth={1.5}
    fill={
      focused
        ? theme.THEME_NUMBER === 3
          ? theme.BACKGROUND
          : theme.TEXT900
        : 'transparent'
    }
    stroke={theme.THEME_NUMBER === 3 ? theme.BACKGROUND : theme.TEXT900}
  />
);

const AddBarIcon = ({color}: {color: string}) => <LinkIcon fill={color} />;

const SearchBarIcon = ({focused, theme}: IconProps) => {
  return focused ? (
    <SearchIcon
      fill={theme.THEME_NUMBER === 3 ? theme.BACKGROUND : theme.TEXT900}
      strokeWidth={1.5}
    />
  ) : (
    <SearchUnfocusedIcon
      fill={theme.THEME_NUMBER === 3 ? theme.BACKGROUND : theme.TEXT900}
      strokeWidth={1.5}
    />
  );
};

const MyPageBarIcon = ({focused, theme}: IconProps) => {
  return focused ? (
    <MypageIcon
      fill={theme.THEME_NUMBER === 3 ? theme.BACKGROUND : theme.TEXT900}
      stroke={theme.THEME_NUMBER === 3 ? theme.BACKGROUND : theme.TEXT900}
    />
  ) : (
    <MypageIcon
      stroke={theme.THEME_NUMBER === 3 ? theme.BACKGROUND : theme.TEXT900}
      strokeWidth={1.5}
    />
  );
};

const BottomTabNavigation = () => {
  const {theme} = useThemeStore();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };

  return (
    <>
      <BottomSheet
        modalTitle="링크 저장"
        {...{isBottomSheetVisible, toggleBottomSheet}}>
        <LinkContent {...{toggleBottomSheet}} />
      </BottomSheet>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor:
            theme.THEME_NUMBER === 3 ? theme.BACKGROUND : theme.TEXT900,
          tabBarInactiveTintColor:
            theme.THEME_NUMBER === 3 ? theme.BACKGROUND : theme.TEXT900,
          tabBarBackground: () =>
            theme.THEME_NUMBER === 3 ? (
              <Image source={require('@/assets/images/img-gnb-theme3.png')} />
            ) : null,
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: theme.BACKGROUND,
          },
        }}>
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => <HomeBarIcon {...{focused, theme}} />,
          }}
        />
        <Tab.Screen
          name="bookmark"
          component={BookmarkScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => <PinnedBarIcon {...{focused, theme}} />,
          }}
        />
        <Tab.Screen
          name="add"
          component={AddScreen}
          options={{
            headerShown: false,
            tabBarIcon: AddBarIcon,
            tabBarButton: props => (
              <TouchableOpacity {...props} onPress={toggleBottomSheet} />
            ),
          }}
        />
        <Tab.Screen
          name="search"
          component={SearchScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => <SearchBarIcon {...{focused, theme}} />,
          }}
        />

        <Tab.Screen
          name="mypage"
          component={MyPageScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => <MyPageBarIcon {...{focused, theme}} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigation;
