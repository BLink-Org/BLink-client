export interface UpdateFolderTitleArgs {
  folderId: number;
  title: string;
}

export interface MoveFolderArgs {
  folderId: number;
  direction: 'up' | 'down';
}

export interface CreateLinkArgs {
  url: string;
  folderIdList: number[];
}

export interface MoveLinkArgs {
  linkId: string;
  folderIdList: number[];
}

export interface UpdateLinkTitleArgs {
  linkId: string;
  title: string;
}

export interface AppleLoginArgs {
  identityToken: string;
  email: string;
}

export interface GetLinkInfoArgs {
  folderId?: number | null;
  page: number;
  size: number;
  sortBy: string;
}

export interface UseLinkInfoArgs {
  folderId?: number | null;
  size: number;
  sortBy: string;
}
