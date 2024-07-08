import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Bold Text</Text>
      <Text style={styles.regularText}>Regular Text</Text>
      <Text style={styles.mediumText}>Medium Text</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  boldText: {
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
  },
  regularText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Regular',
  },
  mediumText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Medium',
  },
});
