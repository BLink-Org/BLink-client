import {SafeAreaView, Text} from 'react-native';
import {useHealthCheck} from '@/api/hooks/useTest';

const HealthCheck = () => {
  const {data} = useHealthCheck();

  // data가 undefined일 경우 에러 처리
  if (!data) {
    return <Text>data is undefined</Text>;
  }

  return (
    <SafeAreaView>
      <Text>health check message</Text>
      <Text>{JSON.stringify(data)}</Text>
    </SafeAreaView>
  );
};

export default HealthCheck;
