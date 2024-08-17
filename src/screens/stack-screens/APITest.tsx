import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Button,
  View,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {useHealthCheck} from '@/api/hooks/useTest';
import {
  useUserInfo,
  useDeleteUserAccount,
  useCancelDeleteUserAccount,
} from '@/api/hooks/useUser';
import {
  useFolders,
  useCreateFolder,
  useDeleteFolder,
  useUpdateFolderTitle,
  useMoveFolder,
} from '@/api/hooks/useFolder';
import {ArrowBackIcon} from '@/assets/icons/mypage';
import {type RootStackNavigationProp, type IFolderDtos} from '@/types';
import SmallCardPlaceHolder from '@/components/home/SmallCardPlaceHolder';

const APITest = () => {
  const queryClient = useQueryClient();
  const {data: healthCheckData} = useHealthCheck();

  const {data: userInfoData} = useUserInfo();
  const {data: useFolderData} = useFolders();
  const foldersData = useFolderData?.folderDtos;
  const navigation = useNavigation<RootStackNavigationProp>();

  const goBackPage = () => {
    navigation.goBack();
  };

  /* 계정 부분 API 테스트 */
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

  /* 폴더 부분 API 테스트 -> 테스트에서 즉각적 데이터 확인을 위해 InvalidateQueries 사용했으나, 추후 state 사용 or setQueryData 사용해서 서버 request 최소화 필요 */
  // 폴더 생성
  const createFolderMutation = useCreateFolder({
    onSuccess: () => {
      console.log('Folder created successfully');
      queryClient.invalidateQueries({queryKey: ['folders']});
    },
    onError: (error: string) => {
      console.warn('Create Folder error:', error);
      console.log(
        'To Tina -> 폴더 생성 시 이름 겹치는 경우 -> 여기서 error handling 필요',
      );
    },
  });

  // 폴더 삭제
  const deleteFolderMutation = useDeleteFolder({
    onSuccess: () => {
      console.log('Folder deleted successfully');
      queryClient.invalidateQueries({queryKey: ['folders']});
    },
  });

  // 폴더 제목 수정
  const updateFolderTitleMutation = useUpdateFolderTitle({
    onSuccess: () => {
      console.log('Folder title updated successfully');
      queryClient.invalidateQueries({queryKey: ['folders']});
    },
  });

  // 폴더 순서 이동
  const moveFolderMutation = useMoveFolder({
    onSuccess: () => {
      console.log('Folder moved successfully');
      queryClient.invalidateQueries({queryKey: ['folders']});
    },
  });

  const handleDeleteAccount = () => {
    deleteUserAccountMutation.mutate();
  };

  const handleCancelDeleteAccount = () => {
    cancelDeleteUserAccountMutation.mutate();
  };

  const handleCreateFolder = () => {
    createFolderMutation.mutate({title: 'New Folder-3'});
  };

  const handleDeleteFolder = (folderId: number) => {
    deleteFolderMutation.mutate(folderId);
  };

  const handleUpdateFolderTitle = (folderId: number) => {
    updateFolderTitleMutation.mutate({
      folderId,
      title: 'Updated Folder Title',
    });
  };

  const handleMoveFolderUp = (folderId: number) => {
    moveFolderMutation.mutate({folderId, direction: 'up'});
  };

  const handleMoveFolderDown = (folderId: number) => {
    moveFolderMutation.mutate({folderId, direction: 'down'});
  };

  // linkApiTest로 이동
  const handleLinkApiTest = () => {
    navigation.navigate('LinkApiTest');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity onPress={goBackPage}>
          <ArrowBackIcon />
        </TouchableOpacity>
        <View style={{height: 100}}>
          <SmallCardPlaceHolder />
        </View>

        <Text style={{fontSize: 25}}>Health API Test</Text>
        <Text>{JSON.stringify(healthCheckData)}</Text>
        <Text style={{fontSize: 25}}>User API Test</Text>
        <Text>{JSON.stringify(userInfoData)}</Text>

        <View style={{padding: 20}}>
          <Text>User Account API Test</Text>
          <Button title="Delete Account" onPress={handleDeleteAccount} />
          <Button
            title="Cancel Account Deletion"
            onPress={handleCancelDeleteAccount}
          />
        </View>

        <Text style={{fontSize: 25}}>Link API Test</Text>
        <Button title="Link API Test" onPress={handleLinkApiTest} />

        <Text style={{fontSize: 25}}>Folder API Test</Text>
        <View style={{padding: 20}}>
          <Button title="Create Folder" onPress={handleCreateFolder} />
          {foldersData?.map((folder: IFolderDtos) => (
            <View key={folder.id} style={{marginVertical: 5}}>
              <Text>Folder ID: {folder.id}</Text>
              <Text>Title: {folder.title}</Text>
              <Text>sortOrder: {folder.sortOrder}</Text>
              <Text>linkCount: {folder.linkCount}</Text>
              <Button
                title="Delete This Folder"
                onPress={() => handleDeleteFolder(folder.id)}
              />
              <Button
                title="Update Folder Title"
                onPress={() => handleUpdateFolderTitle(folder.id)}
              />
              <Button
                title="Move Folder Up"
                onPress={() => handleMoveFolderUp(folder.id)}
              />
              <Button
                title="Move Folder Down"
                onPress={() => handleMoveFolderDown(folder.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default APITest;
