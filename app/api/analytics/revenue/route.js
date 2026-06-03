import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || 'day';

  const now = new Date();
  let from;
  if (period === 'day') {
    from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (period === 'week') {
    from = new Date(now);
    from.setDate(now.getDate() - 6);
    from.setHours(0, 0, 0, 0);
  } else {
    from = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: from }, status: { not: 'CANCELLED' } },
    select: { total: true, createdAt: true },
  });

  const total = orders.reduce((s, o) => s + o.total, 0);
  const count = orders.length;
  const avg = count > 0 ? total / count : 0;

  // Build chart data
  const buckets = {};
  for (const order of orders) {
    let key;
    const d = new Date(order.createdAt);
    if (period === 'day') {
      key = `${d.getHours().toString().padStart(2, '0')}:00`;
    } else if (period === 'week') {
      key = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } else {
      key = `Week ${Math.ceil(d.getDate() / 7)}`;
    }
    buckets[key] = (buckets[key] || 0) + order.total;
  }

  const data = Object.entries(buckets).map(([label, revenue]) => ({ label, revenue: parseFloat(revenue.toFixed(2)) }));

  return NextResponse.json({ total: parseFloat(total.toFixed(2)), count, avg: parseFloat(avg.toFixed(2)), data });
}
