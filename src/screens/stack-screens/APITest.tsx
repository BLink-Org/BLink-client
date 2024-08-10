import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useHealthCheck} from '@/api/hooks/useTest';
import {useUserInfo} from '@/api/hooks/useUser';
import {useUserStore} from '@/store/useUserStore';

const APITest = () => {
  const {data: healthCheckData} = useHealthCheck();
  const {data: userInfoData, error} = useUserInfo();

  if (error) {
    console.error('Error while fetching user info:', error);
  }

  // accessToken refreshToken 가져오기
  const {accessToken, refreshToken} = useUserStore.getState();

  return (
    <SafeAreaView>
      <Text>API Test</Text>
      <Text>{JSON.stringify(healthCheckData)}</Text>
      <Text>{JSON.stringify(userInfoData)}</Text>
      <Text>accessToken: {accessToken}</Text>
      <Text>refreshToken: {refreshToken}</Text>
    </SafeAreaView>
  );
};

export default APITest;
