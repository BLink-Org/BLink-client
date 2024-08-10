import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, Button, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {useHealthCheck} from '@/api/hooks/useTest';
import {
  useUserInfo,
  useDeleteUserAccount,
  useCancelDeleteUserAccount,
} from '@/api/hooks/useUser';
import {ArrowBackIcon} from '@/assets/icons/mypage';

const APITest = () => {
  const queryClient = useQueryClient();
  const {data: healthCheckData} = useHealthCheck();
  const {data: userInfoData} = useUserInfo();
  const navigation = useNavigation();
  const goBackPage = () => {
    navigation.goBack();
  };

  // 계정 삭제
  const deleteUserAccountMutation = useDeleteUserAccount({
    onSuccess: () => {
      console.log('Account deletion requested successfully');
      queryClient.invalidateQueries({queryKey: ['userInfo']});
    },
  });
  // 계정 삭제 철회
  const cancelDeleteUserAccountMutation = useCancelDeleteUserAccount({
    onSuccess: () => {
      console.log('Account deletion canceled successfully');
      queryClient.invalidateQueries({queryKey: ['userInfo']});
    },
  });

  const handleDeleteAccount = () => {
    deleteUserAccountMutation.mutate();
  };

  const handleCancelDeleteAccount = () => {
    cancelDeleteUserAccountMutation.mutate();
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={goBackPage}>
        <ArrowBackIcon />
      </TouchableOpacity>
      <Text>API Test</Text>
      <Text>{JSON.stringify(healthCheckData)}</Text>
      <Text>{JSON.stringify(userInfoData)}</Text>

      <View style={{padding: 20}}>
        <Text>User Account API Test</Text>
        <Button title="Delete Account" onPress={handleDeleteAccount} />
        <Button
          title="Cancel Account Deletion"
          onPress={handleCancelDeleteAccount}
        />
      </View>
    </SafeAreaView>
  );
};

export default APITest;
