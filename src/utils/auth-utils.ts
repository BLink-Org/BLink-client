import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useUserStore} from '@/store/useUserStore';

export const signOut = async (): Promise<void> => {
  try {
    await GoogleSignin.signOut();
    const {clearTokens} = useUserStore.getState();
    await clearTokens();
    console.log('User signed out successfully');
  } catch (error: any) {
    console.log('Error signing out', error);
  }
};
