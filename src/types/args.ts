export interface UpdateFolderTitleArgs {
  folderId: string;
  title: string;
}

export interface MoveFolderArgs {
  folderId: string;
  direction: 'up' | 'down';
}
