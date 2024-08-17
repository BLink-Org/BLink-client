import {type RouteProp, type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

/* BottomTab Type 정의 */
export interface BottomTabParamList extends ParamListBase {
  home: undefined;
  add: undefined;
  bookmark: undefined;
  mypage: {toastState: string | undefined};
}

// BottomTab Screen 대한 Route Object의 Type을 정의
export type HomeRouteProp = RouteProp<BottomTabParamList, 'home'>;
export type AddRouteProp = RouteProp<BottomTabParamList, 'add'>;
export type BookmarkRouteProp = RouteProp<BottomTabParamList, 'bookmark'>;
export type MyPageRouteProp = RouteProp<BottomTabParamList, 'mypage'>;

/* Stack Type 정의 */
export interface RootStackParamList extends ParamListBase {
  Main: undefined;
  ThemeSetting: undefined;
  Support: undefined;
  AccountDelete: undefined;
  AccountManage: undefined;
  Setting: undefined;
  Trash: undefined;
  APITest: undefined;
  Onboarding: undefined;
  LinkApiText: undefined;
  WebViewList: {
    folderId: number | null;
    sortBy: string;
    initialIndex: number;
    size: number;
  };
  BookmarkWebView: {
    sortBy: string;
    initialIndex: number;
    size: number;
  };
  SearchWebView: {
    query: string | null;
    size: number;
    initialIndex: number;
  };
}

// BottomTab Screen에 대한 Navigation Object의 Type을 정의
export type TabNavigationProp = BottomTabNavigationProp<BottomTabParamList>;
// Stack Screen에 대한 Navigation Object의 Type을 정의
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

// 웹뷰 리스트에 대한 Navigation Object의 Type을 정의
export type WebViewListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WebViewList'
>;

// 검색 웹뷰에 대한 Navigation Object의 Type을 정의
export type SearchWebViewNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SearchWebView'
>;

// 북마크 웹뷰에 대한 Navigation Object의 Type을 정의
export type BookmarkWebViewNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BookmarkWebView'
>;
