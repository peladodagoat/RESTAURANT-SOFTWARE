import { NextResponse } from 'next/server';
import { demoOrders } from '@/lib/mockData';

export async function PATCH(request, { params }) {
  const { status } = await request.json();
  const order = demoOrders.find((o) => o.id === params.id) || { id: params.id };
  return NextResponse.json({ ...order, status });
}
