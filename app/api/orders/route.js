import { NextResponse } from 'next/server';
import { demoOrders, menuItems } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(demoOrders);
}

export async function POST(request) {
  const data = await request.json();
  const itemMap = Object.fromEntries(menuItems.map((m) => [m.id, m]));
  const total = data.items.reduce((sum, i) => sum + (itemMap[i.menuItemId]?.price || 0) * i.quantity, 0);

  const order = {
    id: `order${Date.now()}`,
    tableId: data.tableId,
    status: 'PENDING',
    paymentMethod: data.paymentMethod,
    total,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: data.items.map((i) => ({
      id: `oi${Date.now()}${Math.random()}`,
      menuItemId: i.menuItemId,
      quantity: i.quantity,
      specialInstructions: i.specialInstructions || null,
      price: itemMap[i.menuItemId]?.price || 0,
      menuItem: { name: itemMap[i.menuItemId]?.name || '', price: itemMap[i.menuItemId]?.price || 0 },
    })),
  };

  return NextResponse.json(order, { status: 201 });
}
