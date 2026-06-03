import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function PATCH(request, { params }) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { status } = await request.json();
  const valid = ['PENDING', 'IN_PROGRESS', 'DELIVERED', 'CANCELLED'];
  if (!valid.includes(status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });

  const order = await prisma.order.update({
    where: { id: params.id },
    data: { status },
    include: { items: { include: { menuItem: true } } },
  });
  return NextResponse.json(order);
}
