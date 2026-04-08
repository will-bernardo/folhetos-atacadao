import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { updateFolheto, deleteFolheto } from '@/lib/folhetos';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const folheto = updateFolheto(id, body);

    if (!folheto) {
      return NextResponse.json({ error: 'Folheto não encontrado' }, { status: 404 });
    }

    return NextResponse.json(folheto);
  } catch {
    return NextResponse.json(
      { error: 'Erro ao atualizar folheto' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const success = deleteFolheto(id);

    if (!success) {
      return NextResponse.json({ error: 'Folheto não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Erro ao excluir folheto' },
      { status: 500 }
    );
  }
}
