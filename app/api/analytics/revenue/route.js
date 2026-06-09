import { NextResponse } from 'next/server';
import { demoRevenue } from '@/lib/mockData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || 'day';
  return NextResponse.json(demoRevenue[period] || demoRevenue.day);
}
