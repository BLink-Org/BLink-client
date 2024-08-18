import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useUserStore} from '@/store/useUserStore';
import {type RootStackNavigationProp} from '@/types';

export const signOut = async (
  navigation: RootStackNavigationProp,
): Promise<void> => {
  try {
    await GoogleSignin.signOut();
    const {clearTokens} = useUserStore.getState();
    await clearTokens();
    console.log('User signed out successfully');

    // Onboarding 화면으로 이동
    navigation.navigate('Onboarding');
  } catch (error: any) {
    console.log('Error signing out', error);
  }
};
