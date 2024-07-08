import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Mypage = () => {
  return (
    <View style={styles.container}>
      <Text>mypage</Text>
    </View>
  );
};

export default Mypage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
