import {useQuery, useMutation} from '@tanstack/react-query';
import {API_ENDPOINTS} from '@/api/endpoints';
import apiClient from '@/api/client';
import {
  type GetLinksSchema,
  type CreateLinkArgs,
  type MoveLinkArgs,
  type UpdateLinkTitleArgs,
} from '@/types';

// 링크 목록 조회 GET
// TODO: 추후 query에 따른 데이터 필터링 및 페이지네이션 추가 필요
const getLinks = async (): Promise<GetLinksSchema> => {
  const {data} = await apiClient.get(API_ENDPOINTS.LINKS.FETCH);
  return data.result;
};

export const useLinks = () => {
  return useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
  });
};

// 링크 저장 POST
const createLink = async (payload: CreateLinkArgs) => {
  const {data} = await apiClient.post(API_ENDPOINTS.LINKS.CREATE, payload);
  return data.result;
};

export const useCreateLink = (options = {}) => {
  return useMutation({
    mutationFn: createLink,
    onError: (error: string) => {
      console.warn('Create Link error:', error);
    },
    ...options,
  });
};

// // 링크 저장 폴더 변경 POST
const moveLink = async (payload: MoveLinkArgs) => {
  const endpoint = API_ENDPOINTS.LINKS.MOVE.replace(':linkId', payload.linkId);
  const {data} = await apiClient.post(endpoint, {
    folderIdList: payload.folderIdList,
  });
  return data.result;
};

export const useMoveLink = (options = {}) => {
  return useMutation({
    mutationFn: moveLink,
    onError: (error: string) => {
      console.warn('Move Link error:', error);
    },
    ...options,
  });
};

// 링크 삭제 DELETE
const deleteLink = async (linkId: string) => {
  const endpoint = API_ENDPOINTS.LINKS.DELETE.replace(':linkId', linkId);
  await apiClient.delete(endpoint);
};

export const useDeleteLink = (options = {}) => {
  return useMutation({
    mutationFn: deleteLink,
    onError: (error: string) => {
      console.warn('Delete Link error:', error);
    },
    ...options,
  });
};

// 링크 제목 수정 PATCH
const updateLinkTitle = async (payload: UpdateLinkTitleArgs) => {
  const endpoint = API_ENDPOINTS.LINKS.UPDATE_TITLE.replace(
    ':linkId',
    payload.linkId,
  );
  await apiClient.patch(endpoint, {title: payload.title});
};

export const useUpdateLinkTitle = (options = {}) => {
  return useMutation({
    mutationFn: updateLinkTitle,
    onError: (error: string) => {
      console.warn('Update Link Title error:', error);
    },
    ...options,
  });
};

// 링크 조회 업데이트 PATCH
const viewLink = async (linkId: string) => {
  const endpoint = API_ENDPOINTS.LINKS.VIEW.replace(':linkId', linkId);
  await apiClient.patch(endpoint);
};

export const useViewLink = (options = {}) => {
  return useMutation({
    mutationFn: viewLink,
    onError: (error: string) => {
      console.warn('View Link error:', error);
    },
    ...options,
  });
};

// 링크 복구 PATCH
const recoverLink = async (linkId: string) => {
  const endpoint = API_ENDPOINTS.LINKS.TRASH_RECOVER.replace(':linkId', linkId);
  await apiClient.patch(endpoint);
};

export const useRecoverLink = (options = {}) => {
  return useMutation({
    mutationFn: recoverLink,
    onError: (error: string) => {
      console.warn('Recover Link error:', error);
    },
    ...options,
  });
};

// 링크 휴지통 이동 PATCH
const moveLinkToTrash = async (linkId: string) => {
  const endpoint = API_ENDPOINTS.LINKS.TRASH_MOVE.replace(':linkId', linkId);
  const {data} = await apiClient.patch(endpoint);
  return data.result;
};

export const useMoveLinkToTrash = (options = {}) => {
  return useMutation({
    mutationFn: moveLinkToTrash,
    onError: (error: string) => {
      console.warn('Move Link to Trash error:', error);
    },
    ...options,
  });
};

// 링크 고정 토글 PATCH
const toggleLinkPin = async (linkId: string) => {
  const endpoint = API_ENDPOINTS.LINKS.PIN_TOGGLE.replace(':linkId', linkId);
  await apiClient.patch(endpoint);
};

export const useToggleLinkPin = (options = {}) => {
  return useMutation({
    mutationFn: toggleLinkPin,
    onError: (error: string) => {
      console.warn('Toggle Link Pin error:', error);
    },
    ...options,
  });
};

// 휴지통 링크 목록 조회 GET
const getTrashLinks = async (): Promise<GetLinksSchema> => {
  const {data} = await apiClient.get(API_ENDPOINTS.LINKS.GET_TRASH);
  return data.result;
};

export const useTrashLinks = () => {
  return useQuery({
    queryKey: ['trashLinks'],
    queryFn: getTrashLinks,
  });
};

// 핀 고정 링크 목록 조회 GET
const getPinnedLinks = async (): Promise<GetLinksSchema> => {
  const {data} = await apiClient.get(API_ENDPOINTS.LINKS.GET_PINNED);
  return data.result;
};

export const usePinnedLinks = () => {
  return useQuery({
    queryKey: ['pinnedLinks'],
    queryFn: getPinnedLinks,
  });
};
