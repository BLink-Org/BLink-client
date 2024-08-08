import React, {useEffect} from 'react';
import {Button, SafeAreaView} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {CLIENT_ID, IOS_CLIENT_ID} from '@env';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error: any) {
      console.log('error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Some other error happened');
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      console.log('User signed out successfully');
    } catch (error: any) {
      console.log('Error signing out', error);
    }
  };

  const handleSignInPress = () => {
    signIn().catch(error => console.error(error));
  };

  const handleSignOutPress = () => {
    signOut().catch(error => console.error(error));
  };

  return (
    <SafeAreaView>
      <GoogleSigninButton onPress={handleSignInPress} />
      <Button title="Sign In with Google" onPress={handleSignInPress} />
      <Button title="Sign Out" onPress={handleSignOutPress} />
    </SafeAreaView>
  );
};

export default App;
