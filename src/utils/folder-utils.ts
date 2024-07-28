import {type FolderList} from '@/types/folder';

export function hasPressedFolder(folders: FolderList[]) {
  return folders.some(folder => folder.variants === 'pressed');
}
