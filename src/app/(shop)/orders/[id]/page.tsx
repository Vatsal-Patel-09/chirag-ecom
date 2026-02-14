import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

const statusSteps = [
  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Package },
];

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;

  let order: any = null;
  let items: any[] = [];

  try {
    const session = await auth();
    if (!session?.user?.id) notFound();

    const [foundOrder] = await db
      .select()
      .from(orders)
      .where(and(eq(orders.id, id), eq(orders.userId, session.user.id)))
      .limit(1);

    if (!foundOrder) notFound();
    order = foundOrder;

    items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, id));
  } catch {
    notFound();
  }

  const addr = order.shippingAddress;
  const total = parseFloat(order.total);
  const statusIndex = statusSteps.findIndex((s) => s.key === order.status);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <Link
        href="/orders"
        className="inline-flex items-center gap-2 text-warm-500 hover:text-primary-600 transition mb-6"
      >
        <ArrowLeft size={18} /> Back to Orders
      </Link>

      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-marker text-warm-900">
            Order {order.orderNumber}
          </h1>
          <p className="text-warm-500 text-sm mt-1">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <span
          className={`cartoon-badge text-sm font-medium px-3 py-1.5 capitalize ${
            order.status === "delivered"
              ? "bg-green-100 text-green-700"
              : order.status === "cancelled"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Status timeline */}
      {order.status !== "cancelled" && (
        <div className="bg-warm-50 sketchy-border-light p-6 mb-6">
          <div className="flex items-center justify-between">
            {statusSteps.map((step, i) => {
              const isCompleted = i <= statusIndex;
              const Icon = step.icon;
              return (
                <div key={step.key} className="flex-1 flex flex-col items-center relative">
                  <div
                    className={`w-10 h-10 sketchy-border-sm flex items-center justify-center ${
                      isCompleted ? "bg-accent-100 text-accent-600" : "bg-warm-100 text-warm-400"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <p className={`text-xs mt-2 font-medium ${isCompleted ? "text-accent-600" : "text-warm-400"}`}>
                    {step.label}
                  </p>
                  {i < statusSteps.length - 1 && (
                    <div
                      className={`absolute top-5 left-[60%] w-[80%] h-0.5 ${
                        i < statusIndex ? "bg-accent-400" : "bg-warm-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Shipping address */}
        <div className="bg-warm-50 sketchy-border-light p-6">
          <h2 className="font-semibold text-warm-900 font-caveat text-lg mb-3">Shipping Address</h2>
          {addr && (
            <div className="text-warm-600 text-sm leading-relaxed">
              <p className="font-medium text-warm-900">{addr.fullName}</p>
              <p>{addr.addressLine1}</p>
              {addr.addressLine2 && <p>{addr.addressLine2}</p>}
              <p>{addr.city}, {addr.state} {addr.postalCode}</p>
              <p>{addr.country}</p>
              <p className="mt-1">Phone: {addr.phone}</p>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="bg-warm-50 sketchy-border-light p-6">
          <h2 className="font-semibold text-warm-900 font-caveat text-lg mb-3">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-warm-500">Subtotal</span>
              <span className="font-medium text-warm-900">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warm-500">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="border-t border-warm-200 pt-2 flex justify-between">
              <span className="font-semibold text-warm-900">Total</span>
              <span className="font-bold text-lg text-warm-900">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order items */}
      <div className="bg-warm-50 sketchy-border-light p-6">
        <h2 className="font-semibold text-warm-900 font-caveat text-lg mb-4">
          Items ({items.length})
        </h2>
        <div className="space-y-4">
          {items.map((item: any) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative w-20 h-20 sketchy-border-sm overflow-hidden bg-warm-100 flex-shrink-0">
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-warm-900">{item.productName}</p>
                <p className="text-warm-500 text-sm">
                  Qty: {item.quantity} x {formatPrice(parseFloat(item.price))}
                </p>
              </div>
              <p className="font-bold text-warm-900">
                {formatPrice(parseFloat(item.price) * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
