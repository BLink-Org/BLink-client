import {useEffect, useState} from 'react';
import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
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
  type GetSearchLinkInfoArgs,
  type ILinkDtos,
  type GetLinkFolderSchema,
} from '@/types';
import {useHandleCacheUpdate} from '@/api/hooks/util';

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
  // await new Promise(resolve => setTimeout(resolve, 1500));
  return data.result;
};

// 링크 목록 조회 GET
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

// 링크 휴지통 이동 훅
export const useMoveLinkToTrash = ({
  size,
  sortBy,
  folderId,
}: UseLinkInfoArgs) => {
  const handleCacheUpdate = useHandleCacheUpdate();

  return useMutation({
    mutationFn: moveLinkToTrash,
    onSuccess: (_, linkId) => {
      const cacheKey = ['links', size, sortBy, folderId];
      handleCacheUpdate(cacheKey, linkId);
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

// 링크 제목 수정 훅
export const useUpdateLinkTitle = ({
  size,
  sortBy,
  folderId,
}: UseLinkInfoArgs) => {
  const handleCacheUpdate = useHandleCacheUpdate();

  return useMutation({
    mutationFn: updateLinkTitle,
    onSuccess: (_, payload) => {
      const cacheKey = ['links', size, sortBy, folderId];
      const updateLinkTitleFn = (link: ILinkDtos) => ({
        ...link,
        title: payload.title,
      });
      handleCacheUpdate(cacheKey, payload.linkId, updateLinkTitleFn);
    },
    onError: (error: string) => {
      console.warn('Update Link Title error:', error);
    },
  });
};

// 특정 링크가 저장 되어 있는 폴더 목록 GET
const getLinkFolder = async (linkId: number): Promise<GetLinkFolderSchema> => {
  const endpoint = API_ENDPOINTS.LINKS.FETCH_FOLDER.replace(
    ':linkId',
    `${linkId}`,
  );
  const {data} = await apiClient.get(endpoint);
  return data.result;
};
export const useLinkFolder = (linkId: number) => {
  return useQuery({
    queryKey: ['linkFolder', linkId],
    queryFn: async () => await getLinkFolder(linkId),
  });
};

// 링크 저장 폴더 변경 POST
const moveLink = async (payload: MoveLinkArgs) => {
  const endpoint = API_ENDPOINTS.LINKS.MOVE.replace(
    ':linkId',
    `${payload.linkId}`,
  );

  // folderIdList가 비어 있을 수 있음을 처리
  const {data} = await apiClient.post(endpoint, {
    folderIdList: payload.folderIdList || [],
  });

  return data.result;
};

export const useMoveLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: moveLink,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['folders']});
      queryClient.invalidateQueries({queryKey: ['links']});
    },
    onError: (error: string) => {
      console.warn('Move Link error:', error);
    },
  });
};

// 링크 고정/고정 해제 토글 PATCH
const toggleLinkPin = async (linkId: string) => {
  const endpoint = API_ENDPOINTS.LINKS.PIN_TOGGLE.replace(':linkId', linkId);
  await apiClient.patch(endpoint);
};

export const useToggleLinkPin = ({size, sortBy, folderId}: UseLinkInfoArgs) => {
  const handleCacheUpdate = useHandleCacheUpdate();
  return useMutation({
    mutationFn: toggleLinkPin,
    onSuccess: (_, linkId) => {
      const cacheKey = ['links', size, sortBy, folderId];
      const togglePinFn = (link: ILinkDtos) => ({
        ...link,
        pinned: !link.pinned,
      });

      handleCacheUpdate(cacheKey, linkId, togglePinFn);
    },
    onError: (error: string) => {
      console.warn('Toggle Link Pin error:', error);
    },
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

// 링크 저장 POST
const createLink = async (payload: CreateLinkArgs) => {
  const {data} = await apiClient.post(API_ENDPOINTS.LINKS.CREATE, payload);
  return data.result;
};

export const useCreateLink = (options = {}) => {
  return useMutation({
    mutationFn: createLink,
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
  const handleCacheUpdate = useHandleCacheUpdate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recoverLink,
    onSuccess: (_, linkId) => {
      const cacheKey = ['trashLinks', size, sortBy];

      handleCacheUpdate(cacheKey, linkId);

      // 'links' 캐시 무효화 처리 (링크 목록 새로고침)
      queryClient.invalidateQueries({queryKey: ['links']});
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
  const handleCacheUpdate = useHandleCacheUpdate();

  return useMutation({
    mutationFn: deleteLink,
    onSuccess: (_, linkId) => {
      const cacheKey = ['trashLinks', size, sortBy];
      handleCacheUpdate(cacheKey, linkId);
    },
    onError: (error: Error) => {
      console.warn('Delete Link error:', error);
    },
  });
};

// 링크 목록 검색
const searchLinks = async (
  payload: GetSearchLinkInfoArgs,
): Promise<GetLinksSchema> => {
  const {query, page, size} = payload;
  const {data} = await apiClient.get(API_ENDPOINTS.LINKS.SEARCH, {
    params: {
      query,
      page,
      size,
    },
  });
  // 1.5초 지연
  // await new Promise(resolve => setTimeout(resolve, 1500));
  return data.result;
};

export const useSearchLinks = ({
  query,
  size,
  enabled,
}: {
  query: string;
  size: number;
  enabled: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: ['searchLinks', query, size],
    queryFn: async ({pageParam = 0}) => {
      const result = await searchLinks({query, page: pageParam, size});
      return result;
    },
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = Math.ceil(lastPage.linkCount / size);
      const nextPage = allPages.length;
      return nextPage < maxPages ? nextPage : undefined;
    },
    initialPageParam: 0,
    enabled, // 쿼리가 실행될 조건을 제어하는 옵션
  });
};

// 링크 조회 업데이트 PATCH
const viewLink = async (linkId: string) => {
  const endpoint = API_ENDPOINTS.LINKS.VIEW.replace(':linkId', linkId);
  await apiClient.patch(endpoint);
};

export const useViewLink = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: viewLink,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['recentSearch']});
    },
    onError: (error: string) => {
      console.warn('View Link error:', error);
    },
    ...options,
  });
};

// 최근 검색어 조회
const getRecentSearch = async (): Promise<ILinkDtos[]> => {
  const {data} = await apiClient.get(API_ENDPOINTS.LINKS.RECENT_SEARCH);
  // 3초 지연
  return data.result.linkDtos;
};

export const useRecentSearch = () => {
  return useQuery({
    queryKey: ['recentSearch'],
    queryFn: getRecentSearch,
  });
};

// 최근 검색어 삭제 API 호출 함수
const excludeRecentSearch = async (linkId: string) => {
  const endpoint = API_ENDPOINTS.LINKS.RECENT_SEARCH_EXCLUDE.replace(
    ':linkId',
    linkId,
  );
  await apiClient.patch(endpoint);
};

export const useDeleteRecentLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: excludeRecentSearch,
    onSuccess: (_, linkId: string) => {
      queryClient.setQueryData<ILinkDtos[]>(['recentSearch'], oldData => {
        if (!oldData) return [];
        // 무한스크롤이 아니므로 util함수 사용 x
        const updatedData = oldData.filter(link => String(link.id) !== linkId);
        return updatedData;
      });
    },
    onError: error => {
      console.error('Error deleting link:', error);
    },
  });
};
