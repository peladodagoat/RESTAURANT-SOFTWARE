import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const where = category ? { category: category.toUpperCase(), available: true } : { available: true };
  const items = await prisma.menuItem.findMany({ where, orderBy: { createdAt: 'asc' } });
  return NextResponse.json(items);
}

export async function POST(request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await request.json();
  const item = await prisma.menuItem.create({
    data: {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      image: data.image || null,
      allergens: data.allergens || [],
      available: data.available !== false,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
