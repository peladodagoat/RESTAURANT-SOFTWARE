import { NextResponse } from 'next/server';
import { menuItems } from '@/lib/mockData';

export async function GET(request, { params }) {
  const item = menuItems.find((i) => i.id === params.id);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request, { params }) {
  const data = await request.json();
  return NextResponse.json({ ...data, id: params.id });
}

export async function DELETE(request, { params }) {
  return NextResponse.json({ success: true });
}
