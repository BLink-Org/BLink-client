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
