import { NextResponse } from 'next/server';
import { config } from '@/lib/data';

export async function GET() {
  return NextResponse.json(config);
}
