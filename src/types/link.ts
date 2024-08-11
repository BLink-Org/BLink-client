export interface ILinkDtos {
  id: number;
  folderName: string;
  title: string;
  contents: string;
  createdAt: string;
  url: string | null;
  imageUrl: string;
  pinned: boolean;
}
