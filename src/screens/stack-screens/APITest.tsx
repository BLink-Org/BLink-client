import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useHealthCheck} from '@/api/hooks/useTest';

const APITest = () => {
  const {data: healthCheckData} = useHealthCheck();

  return (
    <SafeAreaView>
      <Text>API Test</Text>
      <Text>{JSON.stringify(healthCheckData)}</Text>
    </SafeAreaView>
  );
};

export default APITest;
