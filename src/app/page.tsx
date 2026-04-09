import Header from '@/components/Header';
import { folhetos } from '@/lib/data';

interface Folheto {
  id: string;
  titulo: string;
  url: string;
  thumbnail?: string;
  data: string;
}

function FolhetoCard({ folheto }: { folheto: Folheto }) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <a
      href={folheto.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-gradient-to-br from-red-50 to-orange-50">
        {folheto.thumbnail ? (
          <img src={folheto.thumbnail} alt={folheto.titulo} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <svg
              className="w-10 h-10 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-xs font-medium text-red-400 uppercase mt-1">PDF</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 pt-8">
          <span className="text-xs font-medium text-white/90 uppercase tracking-wider bg-red-600 px-2 py-1 rounded">
            PDF
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 text-sm">
          {folheto.titulo}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {formatDate(folheto.data)}
        </p>
        <div className="mt-2 flex items-center justify-center gap-1 bg-red-50 text-red-600 py-1.5 px-3 rounded-lg font-medium text-xs group-hover:bg-red-600 group-hover:text-white transition-colors">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Baixar PDF
        </div>
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <section className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Ofertas do dia A</h2>
          <p className="text-gray-500 mt-1">Clique para baixar e conferir as promoções</p>
        </div>

        {folhetos.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500">Nenhum folheto disponível no momento.</p>
            <p className="text-gray-400 text-sm mt-1">Volte em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {folhetos.map((folheto) => (
              <FolhetoCard key={folheto.id} folheto={folheto} />
            ))}
          </div>
        )}
      </section>

      <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Ofertas válidas para Caruaru-PE<br/>
            © {new Date().getFullYear()} Atacadão. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
