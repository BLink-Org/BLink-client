import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {API_ENDPOINTS} from '@/api/endpoints';
import apiClient from '@/api/client';
import {
  type GetFoldersSchema,
  type MoveFolderArgs,
  type UpdateFolderTitleArgs,
} from '@/types';

// 폴더 목록 조회 get
const getFolders = async (): Promise<GetFoldersSchema> => {
  const {data} = await apiClient.get(API_ENDPOINTS.FOLDER.FETCH);
  return data.result;
};

export const useFolders = () => {
  return useQuery({
    queryKey: ['folders'],
    queryFn: getFolders,
  });
};

// 폴더 생성 post
const createFolder = async (payload: {title: string}) => {
  const {data} = await apiClient.post(API_ENDPOINTS.FOLDER.CREATE, payload);
  return data.result;
};

export const useCreateFolder = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['folders']});
    },
    onError: (error: string) => {
      console.warn('Create Folder error:', error);
    },
    ...options,
  });
};

// 폴더 삭제 delete
const deleteFolder = async (folderId: number) => {
  const endpoint = API_ENDPOINTS.FOLDER.DELETE.replace(
    ':folderId',
    `${folderId}`,
  );
  await apiClient.delete(endpoint);
};

export const useDeleteFolder = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['folders']});
    },
    onError: error => {
      console.warn('Delete Folder error:', error);
    },
    ...options,
  });
};

// 폴더 제목 수정 patch
const updateFolderTitle = async (payload: UpdateFolderTitleArgs) => {
  const endpoint = API_ENDPOINTS.FOLDER.UPDATE_TITLE.replace(
    ':folderId',
    `${payload.folderId}`,
  );
  await apiClient.patch(endpoint, {title: payload.title});
};

export const useUpdateFolderTitle = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFolderTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['folders']});
    },
    onError: error => {
      console.warn('Update Folder Title error:', error);
    },
    ...options,
  });
};

// 폴더 순서 이동 patch
const moveFolder = async (payload: MoveFolderArgs) => {
  const endpoint = API_ENDPOINTS.FOLDER.MOVE.replace(
    ':folderId',
    payload.folderId,
  ).replace(':direction', payload.direction);
  await apiClient.patch(endpoint);
};

export const useMoveFolder = (options = {}) => {
  return useMutation({
    mutationFn: moveFolder,
    onError: error => {
      console.warn('Move Folder error:', error);
    },
    ...options,
  });
};
