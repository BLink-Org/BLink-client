export interface FolderButtonProps {
  id: number;
  variants: 'pressed' | 'activated' | 'default';
  name?: string;
  number: number;
}

export interface IFolderDtos {
  id: number;
  title: string;
  sortOrder: number;
  linkCount: number;
  recent: boolean;
}
