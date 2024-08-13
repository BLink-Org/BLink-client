export interface UpdateFolderTitleArgs {
  folderId: string;
  title: string;
}

export interface MoveFolderArgs {
  folderId: string;
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
  page: number;
  size: number;
  sortBy: string;
}

export interface UseLinkInfoArgs {
  size: number;
  sortBy: string;
}
