export interface Folheto {
  id: string;
  titulo: string;
  url: string;
  thumbnail?: string;
  data: string;
}

export interface FolhetoList {
  folhetos: Folheto[];
}
