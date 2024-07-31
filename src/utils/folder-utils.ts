import {type FolderButtonProps} from '@/types/folder';

export function hasPressedFolder(folders: FolderButtonProps[]) {
  return folders.some(folder => folder.variants === 'pressed');
}
