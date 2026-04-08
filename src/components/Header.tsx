interface HeaderConfig {
  header: {
    imagem: string;
  };
}

function HeaderDefault() {
  return (
    <header className="bg-red-600 text-white shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-3">
          <div className="bg-white rounded-full p-2">
            <svg
              className="w-8 h-8 text-red-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 7V4H5v3H2v13h3v3h14v-3h3V7h-3zm-9 11H7v-5h3v5zm5-8h-2V6h2v4zm0 5h-2v-2h2v2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Atacadão</h1>
            <p className="text-xs text-red-100">Folhetos de Ofertas</p>
          </div>
        </div>
      </div>
    </header>
  );
}

async function getHeaderConfig(): Promise<HeaderConfig> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/config.json`, { cache: 'no-store' });
    if (res.ok) {
      return res.json();
    }
  } catch {
  }
  return { header: { imagem: '' } };
}

export default async function Header() {
  const config = await getHeaderConfig();
  const imageUrl = config.header?.imagem;

  if (!imageUrl) {
    return <HeaderDefault />;
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <img
        src={imageUrl}
        alt="Header"
        className="w-full h-auto"
      />
    </header>
  );
}
