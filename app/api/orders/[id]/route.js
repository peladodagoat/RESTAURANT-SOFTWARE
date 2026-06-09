import { NextResponse } from 'next/server';
import { demoOrders } from '@/lib/mockData';

export async function GET(request, { params }) {
  const order = demoOrders.find((o) => o.id === params.id);
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(order);
}

export async function DELETE() {
  return NextResponse.json({ success: true });
}
