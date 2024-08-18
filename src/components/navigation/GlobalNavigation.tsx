import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ThemeSetting from '@/screens/stack-screens/ThemeSetting';
import Support from '@/screens/stack-screens/Support';
import AccountDelete from '@/screens/stack-screens/AccountDelete';
import AccountManage from '@/screens/stack-screens/AccountManage';
import Setting from '@/screens/stack-screens/Setting';
import Trash from '@/screens/stack-screens/Trash';
import Onboarding from '@/screens/stack-screens/Onboarding';
import WebViewList from '@/screens/stack-screens/WebViewList';
import SearchWebView from '@/screens/stack-screens/SearchWebView';
import {type RootStackParamList} from '@/types/navigation';
import BookmarkWebView from '@/screens/stack-screens/BookmarkWebView';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const GlobalNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen name="Main" component={BottomTabNavigation} />
      <Stack.Screen name="ThemeSetting" component={ThemeSetting} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="AccountDelete" component={AccountDelete} />
      <Stack.Screen name="AccountManage" component={AccountManage} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Trash" component={Trash} />
      <Stack.Screen
        name="WebViewList"
        component={WebViewList}
        options={{animation: 'slide_from_bottom'}}
      />

      <Stack.Screen
        name="SearchWebView"
        component={SearchWebView}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="BookmarkWebView"
        component={BookmarkWebView}
        options={{animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

export default GlobalNavigation;
