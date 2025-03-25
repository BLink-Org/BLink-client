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
import {trackEvent} from '@/utils/amplitude-utils';

const Tab = createBottomTabNavigator<BottomTabParamList>();

interface IconProps {
  focused: boolean;
  theme: Theme;
}

const isSpecialTheme = (themeNumber: number) =>
  themeNumber === 3 || themeNumber === 4;

const getIconColor = (theme: Theme, focused: boolean = false) => {
  if (isSpecialTheme(theme.THEME_NUMBER)) {
    return theme.BACKGROUND;
  }
  return theme.TEXT900;
};

const HomeBarIcon = ({focused, theme}: IconProps) => (
  <HomeIcon
    strokeWidth={1.5}
    fill={focused ? getIconColor(theme) : 'transparent'}
    stroke={getIconColor(theme)}
  />
);

const PinnedBarIcon = ({focused, theme}: IconProps) => (
  <PinnedIcon
    strokeWidth={1.5}
    fill={focused ? getIconColor(theme) : 'transparent'}
    stroke={getIconColor(theme)}
  />
);

const AddBarIcon = ({color}: {color: string}) => <LinkIcon fill={color} />;

const SearchBarIcon = ({focused, theme}: IconProps) => {
  return focused ? (
    <SearchIcon fill={getIconColor(theme)} strokeWidth={1.5} />
  ) : (
    <SearchUnfocusedIcon fill={getIconColor(theme)} strokeWidth={1.5} />
  );
};

const MyPageBarIcon = ({focused, theme}: IconProps) => {
  const color = getIconColor(theme);
  return focused ? (
    <MypageIcon fill={color} stroke={color} />
  ) : (
    <MypageIcon stroke={color} strokeWidth={1.5} />
  );
};

const getTabBarBackground = (themeNumber: number) => {
  switch (themeNumber) {
    case 3:
      return <Image source={require('@/assets/images/img-gnb-theme3.png')} />;
    case 4:
      return <Image source={require('@/assets/images/img-gnb-theme4.png')} />;
    default:
      return null;
  }
};

const BottomTabNavigation = () => {
  const {theme} = useThemeStore();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };
  const toggleBottomSheetEvent = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
    trackEvent('Link_Saved_form', {
      Link_Saved_Location: 'in-global-navigation-bar',
    });
  };

  return (
    <>
      <BottomSheet
        modalTitle="링크 저장"
        {...{isBottomSheetVisible, toggleBottomSheet}}>
        <LinkContent toggleBottomSheet={toggleBottomSheetEvent} />
      </BottomSheet>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: getIconColor(theme),
          tabBarInactiveTintColor: getIconColor(theme),
          tabBarBackground: () => getTabBarBackground(theme.THEME_NUMBER),
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
