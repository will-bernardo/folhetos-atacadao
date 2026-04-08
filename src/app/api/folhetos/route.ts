import { NextResponse } from 'next/server';
import { folhetos } from '@/lib/data';

export async function GET() {
  return NextResponse.json(folhetos);
}
