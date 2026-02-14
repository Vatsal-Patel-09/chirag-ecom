import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, orders, addresses } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { User, Package, MapPin, ShoppingBag, ChevronRight } from "lucide-react";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/account");

  let user: any = null;
  let recentOrders: any[] = [];
  let addressCount = 0;
  let orderCount = 0;

  try {
    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);
    user = foundUser;

    recentOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, session.user.id))
      .orderBy(desc(orders.createdAt))
      .limit(3);

    const [orderResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(orders)
      .where(eq(orders.userId, session.user.id));
    orderCount = orderResult?.count || 0;

    const [addrResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(addresses)
      .where(eq(addresses.userId, session.user.id));
    addressCount = addrResult?.count || 0;
  } catch {
    // DB not connected
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipped: "bg-accent-100 text-accent-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-3xl font-bold font-marker text-warm-900 mb-8">
        My Account
      </h1>

      {/* Profile card */}
      <div className="bg-warm-50 sketchy-border-light p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary-100 sketchy-border-sm flex items-center justify-center">
            <User size={28} className="text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-warm-900">
              {user?.name || session.user.name || "Customer"}
            </h2>
            <p className="text-warm-500">{user?.email || session.user.email}</p>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Link
          href="/orders"
          className="bg-warm-50 sketchy-border-light p-5 hover:border-primary-300 hover:sketch-shadow-sm transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <Package size={24} className="text-primary-600" />
            <ChevronRight size={18} className="text-warm-400 group-hover:text-primary-600 transition" />
          </div>
          <p className="text-2xl font-bold text-warm-900">{orderCount}</p>
          <p className="text-warm-500 text-sm">Total Orders</p>
        </Link>
        <Link
          href="/account/addresses"
          className="bg-warm-50 sketchy-border-light p-5 hover:border-primary-300 hover:sketch-shadow-sm transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <MapPin size={24} className="text-primary-600" />
            <ChevronRight size={18} className="text-warm-400 group-hover:text-primary-600 transition" />
          </div>
          <p className="text-2xl font-bold text-warm-900">{addressCount}</p>
          <p className="text-warm-500 text-sm">Saved Addresses</p>
        </Link>
        <Link
          href="/products"
          className="bg-warm-50 sketchy-border-light p-5 hover:border-primary-300 hover:sketch-shadow-sm transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <ShoppingBag size={24} className="text-primary-600" />
            <ChevronRight size={18} className="text-warm-400 group-hover:text-primary-600 transition" />
          </div>
          <p className="text-2xl font-bold text-warm-900">Browse</p>
          <p className="text-warm-500 text-sm">Continue Shopping</p>
        </Link>
      </div>

      {/* Recent orders */}
      <div className="bg-warm-50 sketchy-border-light p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-warm-900">Recent Orders</h2>
          {orderCount > 3 && (
            <Link
              href="/orders"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All
            </Link>
          )}
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-warm-500 text-sm py-4">No orders yet.</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order: any) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="flex items-center justify-between py-3 border-b border-warm-200 last:border-0 hover:bg-warm-100 -mx-2 px-2 rounded-lg transition"
              >
                <div>
                  <p className="font-medium text-warm-900 text-sm">
                    {order.orderNumber}
                  </p>
                  <p className="text-warm-400 text-xs">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`cartoon-badge text-xs font-medium px-2 py-0.5 capitalize ${
                      statusColors[order.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="font-semibold text-sm text-warm-900">
                    {formatPrice(parseFloat(order.total))}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
