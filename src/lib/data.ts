export interface Folheto {
  id: string;
  titulo: string;
  url: string;
  thumbnail?: string;
  data: string;
}

export interface Config {
  header: {
    imagem: string;
  };
}

export const folhetos: Folheto[] = [
  {
    id: '1',
    titulo: 'DIA A',
    url: 'https://pub-218438f0586c4a8a9d966a4295cde53e.r2.dev/dia-A.pdf',
    thumbnail: 'https://pub-218438f0586c4a8a9d966a4295cde53e.r2.dev/thumb-dia-a.avif',
    data: '2026-04-09'
  }
];

export const config: Config = {
  header: {
    imagem: 'https://pub-218438f0586c4a8a9d966a4295cde53e.r2.dev/header2.png'
  }
};
