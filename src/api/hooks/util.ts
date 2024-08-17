import {
  type InfiniteData,
  type QueryKey,
  useQueryClient,
} from '@tanstack/react-query';
import {type GetLinksSchema, type ILinkDtos} from '@/types';

// updateFn에 맞게 링크 캐시 업데이트
const updateLinkCache = (
  oldData: InfiniteData<GetLinksSchema> | undefined,
  linkId: string,
  updateFn: (link: ILinkDtos) => ILinkDtos,
): InfiniteData<GetLinksSchema> | undefined => {
  if (!oldData) return oldData;
  const newPages = oldData.pages.map(page => ({
    ...page,
    linkDtos: page.linkDtos.map(link =>
      String(link.id) === linkId ? updateFn(link) : link,
    ),
  }));
  return {
    ...oldData,
    pages: newPages,
  };
};

// 특정 링크 ID를 제거 후 캐시 업데이트
const filterLinkCache = (
  oldData: InfiniteData<GetLinksSchema> | undefined,
  linkId: string,
) => {
  if (!oldData) return oldData;
  const newPages = oldData.pages.map(page => ({
    ...page,
    linkDtos: page.linkDtos.filter(link => String(link.id) !== linkId),
    linkCount: page.linkCount - 1,
  }));
  return {
    ...oldData,
    pages: newPages,
  };
};

// 캐시 업데이트 커스텀 훅
export const useHandleCacheUpdate = () => {
  const queryClient = useQueryClient();
  return (
    cacheKey: QueryKey,
    linkId: string,
    updateFn?: (link: ILinkDtos) => ILinkDtos,
  ) => {
    queryClient.setQueryData<InfiniteData<GetLinksSchema>>(
      cacheKey,
      oldData => {
        return updateFn
          ? updateLinkCache(oldData, linkId, updateFn)
          : filterLinkCache(oldData, linkId);
      },
    );
  };
};
