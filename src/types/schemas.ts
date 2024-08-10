import {type IFolderDtos} from '@/types';

export interface TokensSchema {
  accessToken: string;
  refreshToken: string;
}

export interface GetFoldersSchema {
  linkTotalCount: number;
  folderDtos: IFolderDtos[];
  noFolderLinkCount: number;
}
