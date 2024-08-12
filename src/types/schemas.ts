import {type ILinkDtos, type IFolderDtos} from '@/types';

export interface TokensSchema {
  accessToken: string;
  refreshToken: string;
}

export interface GetFoldersSchema {
  linkTotalCount: number;
  folderDtos: IFolderDtos[];
  noFolderLinkCount: number;
}

export interface GetLinksSchema {
  linkCount: number;
  linkDtos: ILinkDtos[];
}
