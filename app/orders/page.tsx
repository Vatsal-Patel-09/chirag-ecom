'use client';

import { useOrderHistoryStore } from '../store/order-history-store';
import Link from 'next/link';

export default function OrdersPage() {
  const { orders } = useOrderHistoryStore();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">No Orders Yet</h1>
          <Link href="/products" className="bg-purple-600 text-white px-6 py-3 rounded-lg inline-block hover:bg-purple-700">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">Order #{order.id.slice(0, 8)}</h3>
                  <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {order.status}
                </span>
              </div>

              <div className="border-t pt-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2">
                    <span>{item.productName} (Size: {item.size}) x {item.quantity}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p><strong>Delivery:</strong> 5-7 working days</p>
                <p><strong>Shipped to:</strong> {order.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
