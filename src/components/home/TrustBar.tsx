import { Truck, ShieldCheck, RotateCcw, Lock } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Shipping", description: "On orders above $50" },
  { icon: ShieldCheck, title: "Premium Quality", description: "100% authentic cotton" },
  { icon: RotateCcw, title: "30-Day Returns", description: "Easy return policy" },
  { icon: Lock, title: "Secure Checkout", description: "100% secure payment" },
];

export default function TrustBar() {
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                <feature.icon size={24} className="text-purple-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
