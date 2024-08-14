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
