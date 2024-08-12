import {Button, View} from 'react-native';

const AppleLogin = () => {
  const handleAppleLogin = () => {
    // Implement Apple Login
    console.log('Apple Login -> 구현 예정');
  };

  return (
    <View>
      <Button title="Sign In with Apple" onPress={handleAppleLogin} />
    </View>
  );
};

export default AppleLogin;
