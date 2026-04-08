export interface Folheto {
  id: string;
  titulo: string;
  url: string;
  data: string;
}

export interface FolhetoList {
  folhetos: Folheto[];
}
