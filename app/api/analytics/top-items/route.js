import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const items = await prisma.orderItem.groupBy({
    by: ['menuItemId'],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 10,
  });

  const menuItems = await prisma.menuItem.findMany({
    where: { id: { in: items.map((i) => i.menuItemId) } },
  });

  const map = Object.fromEntries(menuItems.map((m) => [m.id, m]));

  const result = items.map((i, idx) => ({
    rank: idx + 1,
    id: i.menuItemId,
    name: map[i.menuItemId]?.name || 'Unknown',
    category: map[i.menuItemId]?.category || '',
    price: map[i.menuItemId]?.price || 0,
    totalOrders: i._sum.quantity,
    revenue: parseFloat(((map[i.menuItemId]?.price || 0) * i._sum.quantity).toFixed(2)),
  }));

  return NextResponse.json(result);
}
