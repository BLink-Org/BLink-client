import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

/* BottomTab Type 정의 */
// BottomTabParamList => BottomTab Screen이 받을 Parameters들을 정의
export type BottomTabParamList = {
  home: undefined;
  add: undefined;
  bookmark: undefined;
  mypage: undefined;
};

// BottomTab Screen 대한 Route Object의 Type을 정의
export type HomeRouteProp = RouteProp<BottomTabParamList, 'home'>;
export type AddRouteProp = RouteProp<BottomTabParamList, 'add'>;
export type BookmarkRouteProp = RouteProp<BottomTabParamList, 'bookmark'>;
export type MyPageRouteProp = RouteProp<BottomTabParamList, 'mypage'>;

/* Stack Type 정의 */
// RootStackParamList => Stack Screen이 받을 Parameter들을 정의
export type RootStackParamList = {
  Main: undefined;
  // ex> DetailPhoto: {image: {path: string; creationDate: string}};
};

// Stack Screen에 대한 Route Object의 Type을 정의
// ex> export type DetailPhotoRouteProp = RouteProp<RootStackParamList, 'DetailPhoto'>;

// BottomTab Screen에 대한 Navigation Object의 Type을 정의
export type TabNavigationProp = BottomTabNavigationProp<BottomTabParamList>;
// Stack Screen에 대한 Navigation Object의 Type을 정의
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
