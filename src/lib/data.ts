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
  // {
  //   id: '1',
  //   titulo: 'Ofertas',
  //   url: 'https://pub-218438f0586c4a8a9d966a4295cde53e.r2.dev/07-04-2026.pdf',
  //   thumbnail: 'https://pub-218438f0586c4a8a9d966a4295cde53e.r2.dev/miniatura-pdf.webp',
  //   data: '2026-04-08'
  // }
];

export const config: Config = {
  header: {
    imagem: 'https://pub-218438f0586c4a8a9d966a4295cde53e.r2.dev/header2.png'
  }
};
