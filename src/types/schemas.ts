import {type ILinkDtos, type IFolderDtos} from '@/types';

export interface UserInfoSchema {
  email: string;
  deleteRequest: boolean;
  deleteRequestDate: string;
  linkCount: number;
  pinCount: number;
  folderCount: number;
}

// 펀딩 상태 조회
export interface FundingStatusSchema {
  fundingParticipated: boolean;
}

export interface TokensSchema {
  accessToken: string;
  refreshToken: string;
}

export interface GetFoldersSchema {
  linkTotalCount: number;
  folderDtos: IFolderDtos[];
  noFolderLinkCount: number;
}

export interface GetLinkFolderSchema {
  folderIdList: number[];
}

export interface GetLinksSchema {
  linkCount: number;
  linkDtos: ILinkDtos[];
}
