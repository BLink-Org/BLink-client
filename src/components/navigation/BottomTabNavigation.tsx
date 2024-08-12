import {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native';
import {
  HomeIcon,
  PinnedIcon,
  LinkIcon,
  MypageIcon,
  SearchIcon,
  SearchUnfocusedIcon,
  MypageUnfocusedIcon,
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
    fill={focused ? theme.TEXT900 : 'transparent'}
    stroke={theme.TEXT900}
  />
);
const PinnedBarIcon = ({focused, theme}: IconProps) => (
  <PinnedIcon
    strokeWidth={1.5}
    fill={focused ? theme.TEXT900 : 'transparent'}
    stroke={theme.TEXT900}
  />
);
const AddBarIcon = ({color}: {color: string}) => <LinkIcon fill={color} />;
const SearchBarIcon = ({focused, theme}: IconProps) => {
  return focused ? (
    <SearchIcon fill={theme.TEXT900} strokeWidth={1.5} />
  ) : (
    <SearchUnfocusedIcon fill={theme.TEXT900} strokeWidth={1.5} />
  );
};
const MyPageBarIcon = ({focused, theme}: IconProps) => {
  return focused ? (
    <MypageIcon fill={theme.TEXT900} />
  ) : (
    <MypageUnfocusedIcon strokeWidth={1.5} stroke={theme.TEXT900} />
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
          tabBarActiveTintColor: theme.TEXT900,
          tabBarInactiveTintColor: theme.TEXT900,
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
