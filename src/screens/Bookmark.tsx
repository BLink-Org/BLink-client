import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Bookmark = () => {
  return (
    <View style={styles.container}>
      <Text>bookmark</Text>
    </View>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
