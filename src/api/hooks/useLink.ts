import {useEffect, useState} from 'react';
import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import {API_ENDPOINTS} from '@/api/endpoints';
import apiClient from '@/api/client';
import {
  type GetLinksSchema,
  type CreateLinkArgs,
  type MoveLinkArgs,
  type UpdateLinkTitleArgs,
  type GetLinkInfoArgs,
  type UseLinkInfoArgs,
} from '@/types';

// 링크 목록 조회 GET
const getLinks = async (payload: GetLinkInfoArgs): Promise<GetLinksSchema> => {
  const {folderId, page, size, sortBy} = payload;
  const {data} = await apiClient.get(API_ENDPOINTS.LINKS.FETCH, {
    params: {
      folderId,
      sortBy,
      page,
      size,
    },
  });
  // 3초 지연
  await new Promise(resolve => setTimeout(resolve, 1500));
  return data.result;
};

export const useLinks = ({folderId, size, sortBy}: UseLinkInfoArgs) => {
  // linkCount를 상태로 관리하여 업데이트가 있을 때만 변경될 수 있도록
  const [linkCount, setLinkCount] = useState<number | null>(0);

  const query = useInfiniteQuery({
    queryKey: ['links', size, sortBy, folderId],
    queryFn: async ({pageParam = 0}) => {
      const result = await getLinks({page: pageParam, size, sortBy, folderId});
      return result;
    },
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = Math.ceil(lastPage.linkCount / size);
      const nextPage = allPages.length;
      return nextPage < maxPages ? nextPage : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    const newLinkCount = query.data?.pages[0]?.linkCount;
    if (newLinkCount !== undefined && newLinkCount !== linkCount) {
      setLinkCount(newLinkCount);
    }
  }, [query.data, linkCount]);

  return {...query, linkCount};
};

// 링크 휴지통 이동 PATCH
const moveLinkToTrash = async (linkId: string) => {
  const endpoint = API_ENDPOINTS.LINKS.TRASH_MOVE.replace(':linkId', linkId);
  const {data} = await apiClient.patch(endpoint);
  return data.result;
};

export const useMoveLinkToTrash = ({
  size,
  sortBy,
  folderId,
}: UseLinkInfoArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveLinkToTrash,
    onSuccess: (_, linkId) => {
      const cacheKey = ['links', size, sortBy, folderId];
      queryClient.setQueryData<InfiniteData<GetLinksSchema>>(
        cacheKey,
        oldData => {
          if (!oldData) {
            return oldData;
          }
          const newPages = oldData.pages.map(page => ({
            ...page,
            linkDtos: page.linkDtos.filter(link => String(link.id) !== linkId),
            linkCount: page.linkCount - 1,
          }));
          return {
            ...oldData,
            pages: newPages,
          };
        },
      );
    },
    onError: (error: Error) => {
      console.warn('Move Link to Trash error:', error);
    },
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

export const useUpdateLinkTitle = ({
  size,
  sortBy,
  folderId,
}: UseLinkInfoArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLinkTitle,
    onSuccess: (_, payload) => {
      const cacheKey = ['links', size, sortBy, folderId];

      queryClient.setQueryData<InfiniteData<GetLinksSchema>>(
        cacheKey,
        oldData => {
          if (!oldData) {
            return oldData;
          }

          const newPages = oldData.pages.map(page => ({
            ...page,
            linkDtos: page.linkDtos.map(link =>
              String(link.id) === payload.linkId
                ? {...link, title: payload.title}
                : link,
            ),
          }));

          return {
            ...oldData,
            pages: newPages,
          };
        },
      );
      // console.log('Update Link Title success:', payload);
    },
    onError: (error: string) => {
      console.warn('Update Link Title error:', error);
    },
  });
};

// 링크 저장 폴더 변경 POST
const moveLink = async (payload: MoveLinkArgs) => {
  const endpoint = API_ENDPOINTS.LINKS.MOVE.replace(':linkId', payload.linkId);
  const {data} = await apiClient.post(endpoint, {
    folderIdList: payload.folderIdList,
  });
  return data.result;
};

  return useMutation({
    mutationFn: moveLink,
    onError: (error: string) => {
      console.warn('Move Link error:', error);
    },
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

// 휴지통 링크 목록 조회 GET
const getTrashLinks = async (
  payload: GetLinkInfoArgs,
): Promise<GetLinksSchema> => {
  const {page, size, sortBy} = payload;
  const {data} = await apiClient.get(API_ENDPOINTS.LINKS.GET_TRASH, {
    params: {
      sortBy,
      page,
      size,
    },
  });
  //  3초 지연
  // await new Promise(resolve => setTimeout(resolve, 2500));
  return data.result;
};

export const useTrashLinks = ({size, sortBy}: UseLinkInfoArgs) => {
  // linkCount를 상태로 관리하여 업데이트가 있을 때만 변경될 수 있도록
  const [linkCount, setLinkCount] = useState<number | null>(0);

  const query = useInfiniteQuery({
    queryKey: ['trashLinks', size, sortBy],
    queryFn: async ({pageParam = 0}) => {
      const result = await getTrashLinks({page: pageParam, size, sortBy});
      return result;
    },
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = Math.ceil(lastPage.linkCount / size);
      const nextPage = allPages.length;
      return nextPage < maxPages ? nextPage : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    const newLinkCount = query.data?.pages[0]?.linkCount;
    if (newLinkCount !== undefined && newLinkCount !== linkCount) {
      setLinkCount(newLinkCount);
    }
  }, [query.data, linkCount]);

  return {...query, linkCount};
};

// 링크 휴지통 복구 PATCH
const recoverLink = async (linkId: string) => {
  const endpoint = API_ENDPOINTS.LINKS.TRASH_RECOVER.replace(':linkId', linkId);
  await apiClient.patch(endpoint);
};

export const useRecoverLink = ({size, sortBy}: UseLinkInfoArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recoverLink,
    onSuccess: (_, linkId) => {
      const cacheKey = ['trashLinks', size, sortBy];
      queryClient.setQueryData<InfiniteData<GetLinksSchema>>(
        cacheKey,
        oldData => {
          if (!oldData) {
            console.log('No oldData found');
            return oldData;
          }
          const newPages = oldData.pages.map(page => ({
            ...page,
            linkDtos: page.linkDtos.filter(link => String(link.id) !== linkId),
            linkCount: page.linkCount - 1,
          }));
          return {
            ...oldData,
            pages: newPages,
          };
        },
      );
    },
    onError: (error: string) => {
      console.warn('Recover Link error:', error);
    },
  });
};

// 휴지통에서 링크 영구 삭제 DELETE
const deleteLink = async (linkId: string) => {
  const endpoint = API_ENDPOINTS.LINKS.DELETE.replace(':linkId', linkId);
  await apiClient.delete(endpoint);
};

// useDeleteLink 훅 정의
export const useDeleteLink = ({size, sortBy}: UseLinkInfoArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLink,
    onSuccess: (_, linkId) => {
      const cacheKey = ['trashLinks', size, sortBy];
      queryClient.setQueryData<InfiniteData<GetLinksSchema>>(
        cacheKey,
        oldData => {
          if (!oldData) {
            return oldData;
          }
          const newPages = oldData.pages.map(page => ({
            ...page,
            linkDtos: page.linkDtos.filter(link => String(link.id) !== linkId),
            linkCount: page.linkCount - 1,
          }));
          return {
            ...oldData,
            pages: newPages,
          };
        },
      );
    },
    onError: (error: Error) => {
      console.warn('Delete Link error:', error);
    },
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
