import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  type RootStackNavigationProp,
  type OnboardingNavigationProp,
} from '@/types';

const TempHome = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  // 모달 닫은 후 로그인으로 이동
  const handleModalClose = () => {
    navigation.navigate('Onboarding');
  };

  // 둘러보기 클릭 시
  const handleAround = () => {
    navigation.navigate('Support');
  };

  return (
    <SafeAreaView>
      <Text>TempHome</Text>
      <Button title="Go to Onboarding" onPress={handleModalClose} />
      <Button title="Go to Support" onPress={handleAround} />
    </SafeAreaView>
  );
};

export default TempHome;

const styles = StyleSheet.create({});
