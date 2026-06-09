import { NextResponse } from 'next/server';
import { demoTopItems } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(demoTopItems);
}
