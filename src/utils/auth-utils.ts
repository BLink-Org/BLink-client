import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useUserStore} from '@/store/useUserStore';
import {trackEvent} from './amplitude-utils';

export const signOut = async (): Promise<void> => {
  try {
    await GoogleSignin.signOut();
    const {clearTokens} = useUserStore.getState();
    await clearTokens();
    trackEvent('Application_End');
  } catch (error: any) {
    console.warn('Error signing out', error);
  }
};
