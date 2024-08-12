import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Button,
  View,
  ScrollView,
} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {
  useLinks,
  useCreateLink,
  useMoveLink,
  useDeleteLink,
  useUpdateLinkTitle,
  useViewLink,
  useToggleLinkPin,
} from '@/api/hooks/useLink';
import {ArrowBackIcon} from '@/assets/icons/mypage';
import {type ILinkDtos} from '@/types';

const LinkApiTest = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const goBackPage = () => {
    navigation.goBack();
  };

  // 링크 목록 조회
  const {data: linksData} = useLinks();
  const links = linksData?.linkDtos;

  // 링크 생성
  const createLinkMutation = useCreateLink({
    onSuccess: () => {
      console.log('Link created successfully');
      queryClient.invalidateQueries({queryKey: ['links']});
    },
  });

  // 링크 폴더 변경
  const moveLinkMutation = useMoveLink({
    onSuccess: () => {
      console.log('Link moved to folder successfully');
      queryClient.invalidateQueries({queryKey: ['links']});
    },
  });

  // 링크 삭제
  const deleteLinkMutation = useDeleteLink({
    onSuccess: () => {
      console.log('Link deleted successfully');
      queryClient.invalidateQueries({queryKey: ['links']});
    },
  });

  // 링크 제목 수정
  const updateLinkTitleMutation = useUpdateLinkTitle({
    onSuccess: () => {
      console.log('Link title updated successfully');
      queryClient.invalidateQueries({queryKey: ['links']});
    },
  });

  // 링크 조회 업데이트
  const viewLinkMutation = useViewLink({
    onSuccess: () => {
      console.log('Link view updated successfully');
    },
  });

  // 링크 고정/해제 토글
  const toggleLinkPinMutation = useToggleLinkPin({
    onSuccess: () => {
      console.log('Link pin toggled successfully');
      queryClient.invalidateQueries({queryKey: ['links']});
    },
  });

  // 버튼 핸들러들
  const handleCreateLink = () => {
    createLinkMutation.mutate({
      url: 'https://velog.io/@hwisaac/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%BF%BC%EB%A6%ACv3-QueryClient-%ED%81%B4%EB%9E%98%EC%8A%A4',
      folderIdList: [1, 2],
    });
  };

  const handleMoveLink = (linkId: string) => {
    moveLinkMutation.mutate({linkId, folderIdList: [2]});
  };

  const handleDeleteLink = (linkId: string) => {
    deleteLinkMutation.mutate(linkId);
  };

  const handleUpdateLinkTitle = (linkId: string) => {
    updateLinkTitleMutation.mutate({linkId, title: 'Updated Link Title'});
  };

  const handleViewLink = (linkId: string) => {
    viewLinkMutation.mutate(linkId);
  };

  const handleToggleLinkPin = (linkId: string) => {
    toggleLinkPinMutation.mutate(linkId);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={{fontSize: 25}}>Link API Test</Text>
        <TouchableOpacity onPress={goBackPage}>
          <ArrowBackIcon />
        </TouchableOpacity>

        <View style={{padding: 20}}>
          <Button title="Create Link" onPress={handleCreateLink} />

          {links?.map((link: ILinkDtos) => (
            <View key={link.id} style={{marginVertical: 10}}>
              <Text>Link ID: {link.id}</Text>
              <Text>Title: {link.title}</Text>
              <Text>Contents: {link.contents}</Text>
              <Text>URL: {link.url}</Text>
              <Button
                title="Move Link"
                onPress={() => handleMoveLink(String(link.id))}
              />
              <Button
                title="Delete Link"
                onPress={() => handleDeleteLink(String(link.id))}
              />
              <Button
                title="Update Link Title"
                onPress={() => handleUpdateLinkTitle(String(link.id))}
              />
              <Button
                title="View Link"
                onPress={() => handleViewLink(String(link.id))}
              />
              <Button
                title="Toggle Pin"
                onPress={() => handleToggleLinkPin(String(link.id))}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LinkApiTest;
