import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';

const CustomLoading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="small" color="#6D96FF" />
    </SafeAreaView>
  );
};

export default CustomLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
