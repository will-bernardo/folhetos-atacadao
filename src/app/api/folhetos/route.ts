import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getFolhetos, addFolheto } from '@/lib/folhetos';

export async function GET() {
  const folhetos = getFolhetos();
  return NextResponse.json(folhetos);
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { titulo, url, data } = body;

    if (!titulo || !url) {
      return NextResponse.json(
        { error: 'Título e URL são obrigatórios' },
        { status: 400 }
      );
    }

    const novoFolheto = addFolheto({
      titulo,
      url,
      data: data || new Date().toISOString().split('T')[0],
    });

    return NextResponse.json(novoFolheto, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Erro ao criar folheto' },
      { status: 500 }
    );
  }
}
