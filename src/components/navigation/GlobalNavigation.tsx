import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {type RootStackParamList} from '@/types/navigation';
import ThemeSetting from '@/screens/stack-screens/ThemeSetting';
import Support from '@/screens/stack-screens/Support';
import AccountDelete from '@/screens/stack-screens/AccountDelete';
import AccountManage from '@/screens/stack-screens/AccountManage';
import Setting from '@/screens/stack-screens/Setting';
import Trash from '@/screens/stack-screens/Trash';
import APITest from '@/screens/stack-screens/APITest';
import Onboarding from '@/screens/stack-screens/Onboarding';
import LinkApiTest from '@/screens/stack-screens/LinkApiTest';
import WebViewList from '@/screens/stack-screens/WebViewList';
import WebViewTest from '@/screens/stack-screens/WebViewTest';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const GlobalNavigation = ({isAuthenticated}: {isAuthenticated: boolean}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isAuthenticated ? (
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen name="Main" component={BottomTabNavigation} />
          <Stack.Screen name="ThemeSetting" component={ThemeSetting} />
          <Stack.Screen name="LinkApiTest" component={LinkApiTest} />
          <Stack.Screen
            name="WebViewTest"
            component={WebViewTest}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen name="APITest" component={APITest} />
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default GlobalNavigation;
