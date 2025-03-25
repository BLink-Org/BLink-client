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
import {useThemeStore} from '@/store/useThemeStore';
import {type Theme} from '@/constants/theme';
import Onboarding from '@/screens/stack-screens/Onboarding';
import UnAuthMypage from '@/screens/unauth-screen/UnAuthMypage';
import {type RootStackNavigationProp} from '@/types';
import ThemeSetting from '@/screens/stack-screens/ThemeSetting';
import Support from '@/screens/stack-screens/Support';
import Setting from '@/screens/stack-screens/Setting';
import UnAuthHome from '@/screens/unauth-screen/UnAuthHome';
import UnAuthWebView from '@/screens/unauth-screen/UnAuthWebView';
import UnAuthSearch from '@/screens/unauth-screen/UnAuthSearch';
import UnAuthLinkContent from '@/components/link/UnAuthLinkContent';
import BottomSheet from '@/components/modal/BottomSheet';
import LoginModal from '@/components/modal/LoginModal';

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

// 아이콘 컴포넌트들 수정
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

  // 링크 추가 add 모달
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };

  return (
    <>
      <BottomSheet
        modalTitle="링크 저장"
        {...{isBottomSheetVisible, toggleBottomSheet}}>
        <UnAuthLinkContent {...{toggleBottomSheet}} />
      </BottomSheet>
      <LoginModal
        isVisible={isNoticeModalVisible}
        onClose={() => setIsNoticeModalVisible(false)}
        onClick={handleModalClose}
      />
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
              <TouchableOpacity {...props} onPress={toggleBottomSheet} />
            ),
          }}
        />
        <Tab.Screen
          name="UnAuthSearch"
          component={UnAuthSearch}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => <SearchBarIcon {...{focused, theme}} />,
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
