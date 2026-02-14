import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="wavy-top bg-warm-900 text-warm-300 w-full">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <span className="brand-name text-warm-100 text-2xl mb-4 inline-block">
              MYOTEES
            </span>
            <p className="font-caveat text-warm-400 text-lg leading-relaxed mb-4">
              Tees that speak your vibe. Hand-picked. Fun-approved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="sketchy-border-sm w-9 h-9 flex items-center justify-center rounded-full text-warm-400 hover:text-primary-400 transition"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="sketchy-border-sm w-9 h-9 flex items-center justify-center rounded-full text-warm-400 hover:text-primary-400 transition"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="sketchy-border-sm w-9 h-9 flex items-center justify-center rounded-full text-warm-400 hover:text-primary-400 transition"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="sketchy-border-sm w-9 h-9 flex items-center justify-center rounded-full text-warm-400 hover:text-primary-400 transition"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-caveat text-lg text-warm-100 mb-4">
              <span className="hand-underline-yellow">Quick Links</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-warm-400 hover:text-primary-400 transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-warm-400 hover:text-primary-400 transition text-sm">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/products?featured=true" className="text-warm-400 hover:text-primary-400 transition text-sm">
                  Featured Collection
                </Link>
              </li>
              <li>
                <Link href="/products?sort=newest" className="text-warm-400 hover:text-primary-400 transition text-sm">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-caveat text-lg text-warm-100 mb-4">
              <span className="hand-underline-yellow">Customer Service</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/account" className="text-warm-400 hover:text-primary-400 transition text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-warm-400 hover:text-primary-400 transition text-sm">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-warm-400 hover:text-primary-400 transition text-sm">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-warm-400 hover:text-primary-400 transition text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-warm-400 hover:text-primary-400 transition text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="font-caveat text-lg text-warm-100 mb-4">
              <span className="hand-underline-yellow">Get In Touch</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-warm-400 text-sm">
                  123 T-Shirt Lane, Andheri West,<br />Mumbai 400058
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-warm-400 hover:text-primary-400 transition text-sm">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-400 flex-shrink-0" />
                <a href="mailto:hello@myotees.in" className="text-warm-400 hover:text-primary-400 transition text-sm">
                  hello@myotees.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-warm-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-warm-400 text-sm">
            &copy; 2026 MYOTEES. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-warm-400 text-sm">UPI | Cards | COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
