import { NextResponse } from 'next/server';
import { demoTopItems } from '@/lib/mockData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || 'month';
  return NextResponse.json(demoTopItems[period] ?? demoTopItems.month);
}
