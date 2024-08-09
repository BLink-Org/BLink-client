import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useHealthCheck} from '@/api/hooks/useTest';
import {useUserInfo} from '@/api/hooks/useUser';

const APITest = () => {
  const {data: healthCheckData} = useHealthCheck();
  const {data: userInfoData} = useUserInfo();

  return (
    <SafeAreaView>
      <Text>API Test</Text>
      <Text>{JSON.stringify(healthCheckData)}</Text>
      <Text>{JSON.stringify(userInfoData)}</Text>
    </SafeAreaView>
  );
};

export default APITest;
