import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex overflow-x-hidden">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/images/banner/bg-1.jpg"
          alt="MYOTEES"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-warm-900/50 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-5xl font-marker text-white mb-4">MYOTEES</h1>
            <p className="text-xl font-caveat text-white/80">Hand-Picked Tees for Every Vibe</p>
          </div>
        </div>
      </div>
      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-warm-50 paper-bg">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8 lg:hidden">
            <Link href="/">
              <span className="text-3xl font-marker text-warm-900">MYOTEES</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
