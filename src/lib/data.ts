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
    titulo: 'Ofertas da Semana',
    url: 'https://pub-2e5ab6e00188409f9a4d80d3c6e3b7c9.r2.dev/amostra.pdf',
    thumbnail: '',
    data: '2026-04-08'
  }
];

export const config: Config = {
  header: {
    imagem: ''
  }
};
