import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getConfig, updateConfig } from '@/lib/folhetos';
import fs from 'fs';
import path from 'path';

const PUBLIC_CONFIG_PATH = path.join(process.cwd(), 'public', 'config.json');

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
    
    fs.writeFileSync(PUBLIC_CONFIG_PATH, JSON.stringify(updated, null, 2));
    
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar configuração' }, { status: 500 });
  }
}
