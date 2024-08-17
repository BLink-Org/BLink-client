import {type InfiniteData} from '@tanstack/react-query';
import {type GetLinksSchema, type ILinkDtos} from '@/types';

export const createCacheKey = (mode: string, foldername: string) => {
  return [mode, foldername];
};

// updateFn에 맞게 링크 캐시 업데이트
export const updateLinkCache = (
  oldData: InfiniteData<GetLinksSchema> | undefined,
  linkId: string,
  updateFn: (link: ILinkDtos) => ILinkDtos,
) => {
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
export const filterLinkCache = (
  oldData: InfiniteData<GetLinksSchema> | undefined,
  linkId: string,
) => {
  if (!oldData) return oldData;

  const newPages = oldData.pages.map(page => ({
    ...page,
    linkDtos: page.linkDtos.filter(link => String(link.id) !== linkId),
  }));

  return {
    ...oldData,
    pages: newPages,
  };
};
