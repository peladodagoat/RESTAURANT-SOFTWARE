import { NextResponse } from 'next/server';
import { menuItems } from '@/lib/mockData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const items = category
    ? menuItems.filter((i) => i.category === category.toUpperCase() && i.available)
    : menuItems.filter((i) => i.available);
  return NextResponse.json(items);
}

export async function POST(request) {
  const data = await request.json();
  const newItem = { ...data, id: `m${Date.now()}`, available: data.available !== false };
  return NextResponse.json(newItem, { status: 201 });
}
