import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 inline-block">
              TeeStore
            </span>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium quality t-shirts for every style and occasion. From everyday basics
              to statement pieces — crafted with the finest fabrics for ultimate comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/products?featured=true" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Featured Collection
                </Link>
              </li>
              <li>
                <Link href="/products?sort=newest" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/account" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  456 Fashion Ave, Suite 100,<br />New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-purple-400 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-purple-400 flex-shrink-0" />
                <a href="mailto:hello@tshirtstore.com" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  hello@tshirtstore.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 TeeStore. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-xs">Loved by 10,000+ happy customers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
