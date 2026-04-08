import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getConfig, updateConfig } from '@/lib/folhetos';

export async function GET() {
  const config = getConfig();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = updateConfig(body);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar configuração' }, { status: 500 });
  }
}
