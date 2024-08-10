import {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native';
import {
  HomeIcon,
  BookmarkIcon,
  LinkIcon,
  MypageIcon,
  SearchIcon,
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

const Tab = createBottomTabNavigator<BottomTabParamList>();

const HomeBarIcon = ({color}: {color: string}) => <HomeIcon fill={color} />;
const BookmarkBarIcon = ({color}: {color: string}) => (
  <BookmarkIcon fill={color} />
);
const AddBarIcon = ({color}: {color: string}) => <LinkIcon fill={color} />;
const SearchBarIcon = ({color}: {color: string}) => <SearchIcon fill={color} />;
const MyPageBarIcon = ({color}: {color: string}) => <MypageIcon fill={color} />;

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
    </>
  );
};

export default BottomTabNavigation;
