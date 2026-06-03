import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const where = status ? { status } : { status: { not: 'CANCELLED' } };

  const orders = await prisma.order.findMany({
    where,
    include: { items: { include: { menuItem: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(orders);
}

export async function POST(request) {
  const data = await request.json();

  const menuItems = await prisma.menuItem.findMany({
    where: { id: { in: data.items.map((i) => i.menuItemId) } },
  });

  const itemMap = Object.fromEntries(menuItems.map((m) => [m.id, m]));
  const total = data.items.reduce((sum, i) => sum + itemMap[i.menuItemId].price * i.quantity, 0);

  const order = await prisma.order.create({
    data: {
      tableId: data.tableId,
      paymentMethod: data.paymentMethod,
      total,
      items: {
        create: data.items.map((i) => ({
          menuItemId: i.menuItemId,
          quantity: i.quantity,
          specialInstructions: i.specialInstructions || null,
          price: itemMap[i.menuItemId].price,
        })),
      },
    },
    include: { items: { include: { menuItem: true } } },
  });

  return NextResponse.json(order, { status: 201 });
}
