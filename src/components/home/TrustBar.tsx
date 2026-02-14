import { Truck, ShieldCheck, RotateCcw, Lock } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Shipping", description: "On orders above Rs.999" },
  { icon: ShieldCheck, title: "Premium Quality", description: "100% authentic cotton" },
  { icon: RotateCcw, title: "30-Day Returns", description: "Easy return policy" },
  { icon: Lock, title: "Secure Checkout", description: "100% secure payment" },
];

const tiltClasses = ["tilt-1", "tilt-2", "tilt-3", "tilt-1"];

export default function TrustBar() {
  return (
    <section className="kraft-bg py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex items-center gap-4 ${tiltClasses[index]}`}
            >
              <div className="sketchy-border-sm bg-secondary-100 p-3 flex-shrink-0">
                <feature.icon size={24} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-caveat font-semibold text-warm-900 text-sm md:text-base">
                  {feature.title}
                </h3>
                <p className="text-warm-500 text-xs md:text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
