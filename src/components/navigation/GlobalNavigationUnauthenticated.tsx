import {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {
  HomeIcon,
  PinnedIcon,
  LinkIcon,
  MypageIcon,
  SearchIcon,
  SearchUnfocusedIcon,
} from '@/assets/icons/bottom-tab';
import AddScreen from '@/screens/tab-screens/Add';
import BookmarkScreen from '@/screens/tab-screens/Bookmark';
import SearchScreen from '@/screens/tab-screens/Search';
import {useThemeStore} from '@/store/useThemeStore';
import {type Theme} from '@/constants/theme';
import Onboarding from '@/screens/stack-screens/Onboarding';
import UnAuthMypage from '@/screens/no-login-tab-screen/UnAuthMypage';
import {type RootStackNavigationProp} from '@/types';
import ThemeSetting from '@/screens/stack-screens/ThemeSetting';
import Support from '@/screens/stack-screens/Support';
import Setting from '@/screens/stack-screens/Setting';
import UnAuthHome from '@/screens/no-login-tab-screen/UnAuthHome';
import UnAuthWebView from '@/screens/no-login-tab-screen/UnAuthWebView';
import LoginModal from '../modal/LoginModal';

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

const Tab = createBottomTabNavigator();

const BottomTabNavigationUnauthenticated = () => {
  const {theme} = useThemeStore();
  const navigation = useNavigation<RootStackNavigationProp>();

  const [isNoticeModalVisible, setIsNoticeModalVisible] = useState(false);

  // 모달 닫은 후 로그인으로 이동
  const handleModalClose = () => {
    navigation.navigate('Onboarding');
    setIsNoticeModalVisible(false);
  };

  const onPressLoginAlert = () => {
    setIsNoticeModalVisible(true);
  };

  return (
    <>
      <LoginModal
        isVisible={isNoticeModalVisible}
        onClose={() => setIsNoticeModalVisible(false)}
        onClick={handleModalClose}
      />
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
          name="UnAuthHome"
          component={UnAuthHome}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => <HomeBarIcon {...{focused, theme}} />,
          }}
        />
        <Tab.Screen
          name="bookmark"
          component={BookmarkScreen}
          options={{
            tabBarIcon: ({focused}) => <PinnedBarIcon {...{focused, theme}} />,
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  onPressLoginAlert();
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="add"
          component={AddScreen}
          options={{
            tabBarIcon: AddBarIcon,
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  onPressLoginAlert();
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({focused}) => <SearchBarIcon {...{focused, theme}} />,
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  onPressLoginAlert();
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="mypage"
          component={UnAuthMypage}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => <MyPageBarIcon {...{focused, theme}} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

// Stack Navigator that includes the Bottom Tab Navigator
const Stack = createNativeStackNavigator();

const GlobalNavigationUnauthenticated = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Tab" component={BottomTabNavigationUnauthenticated} />
      <Stack.Screen
        name="UnAuthWebView"
        component={UnAuthWebView}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen name="ThemeSetting" component={ThemeSetting} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

export default GlobalNavigationUnauthenticated;
