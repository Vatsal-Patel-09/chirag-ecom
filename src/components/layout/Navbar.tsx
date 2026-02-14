"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cart-store";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  UserCircle,
  LayoutDashboard,
  Heart,
  Phone,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Men", slug: "men" },
  { name: "Women", slug: "women" },
  { name: "Unisex", slug: "unisex" },
  { name: "Kids", slug: "kids" },
  { name: "Sports", slug: "sports" },
  { name: "Premium", slug: "premium" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const itemCount = useCartStore((s) => s.getItemCount());

  const shopDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside clicks (for touch / mobile)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(e.target as Node)) {
        setShopDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ===== Top Announcement Bar ===== */}
      <div className="bg-warm-800 text-warm-100 text-sm py-1.5 sm:py-2">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between">
          <p className="font-caveat text-sm sm:text-base text-center w-full sm:w-auto sm:text-left">
            Free delivery on orders above Rs.999
          </p>
          <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 hover:text-primary-400 transition"
            >
              <Phone size={14} />
              +91 98765 43210
            </a>
            <span className="text-warm-500">|</span>
            <a
              href="mailto:hello@myotees.in"
              className="flex items-center gap-1.5 hover:text-primary-400 transition"
            >
              <Mail size={14} />
              hello@myotees.in
            </a>
          </div>
        </div>
      </div>

      {/* ===== Main Navbar ===== */}
      <nav className="bg-warm-900">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-warm-200 hover:text-primary-400 transition p-1.5"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="brand-name text-xl sm:text-2xl text-warm-100 hover:text-primary-400 transition">
                MYOTEES
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Shop dropdown */}
              <div
                className="relative"
                ref={shopDropdownRef}
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <button
                  onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                  className="text-warm-200 hover:text-primary-400 font-medium transition flex items-center gap-1 px-3 py-2"
                >
                  Shop <ChevronDown size={16} className={`transition-transform ${shopDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {shopDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-warm-800 sketchy-border-sm py-2 z-50 shadow-lg">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/products?category=${cat.slug}`}
                        onClick={() => setShopDropdownOpen(false)}
                        className="block px-5 py-2.5 text-warm-200 hover:text-primary-400 hover:bg-warm-700 transition"
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <div className="border-t border-warm-700 mt-2 pt-2">
                      <Link
                        href="/products"
                        onClick={() => setShopDropdownOpen(false)}
                        className="block px-5 py-2.5 text-primary-400 font-medium hover:bg-warm-700 transition"
                      >
                        View All Products
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct category links */}
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className="text-warm-200 hover:text-primary-400 font-medium transition px-3 py-2"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Desktop persistent search */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex items-center flex-1 max-w-md mx-4"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tees..."
                  className="sketchy-border-light w-full px-4 py-2 pr-12 bg-warm-800 text-warm-100 placeholder-warm-400 outline-none focus:border-primary-500 transition"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-primary-600 hover:bg-primary-700 text-white transition rounded-r-sm"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Right icons */}
            <div className="flex items-center gap-0 sm:gap-1">
              {/* Mobile search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="lg:hidden text-warm-200 hover:text-primary-400 transition p-1.5 sm:p-2"
                aria-label="Toggle search"
              >
                <Search size={18} className="sm:hidden" />
                <Search size={20} className="hidden sm:block" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="text-warm-200 hover:text-primary-400 transition p-1.5 sm:p-2 hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link>

              {/* User dropdown */}
              <div
                className="relative"
                ref={userDropdownRef}
              >
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`p-1.5 sm:p-2 transition ${
                    userDropdownOpen
                      ? "text-primary-400"
                      : "text-warm-200 hover:text-primary-400"
                  }`}
                  aria-label="Account"
                >
                  <User size={18} className="sm:hidden" />
                  <User size={20} className="hidden sm:block" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-56 bg-warm-800 sketchy-border-sm py-2 z-50 shadow-lg">
                    {session ? (
                      <>
                        <div className="px-5 py-2.5 border-b border-warm-700 mb-1">
                          <p className="font-medium text-warm-100 truncate">
                            {session.user?.name}
                          </p>
                          <p className="text-sm text-warm-400 truncate">
                            {session.user?.email}
                          </p>
                        </div>
                        <Link
                          href="/account"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-5 py-2.5 text-warm-200 hover:text-primary-400 hover:bg-warm-700 transition"
                        >
                          <UserCircle size={18} /> My Account
                        </Link>
                        <Link
                          href="/orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-5 py-2.5 text-warm-200 hover:text-primary-400 hover:bg-warm-700 transition"
                        >
                          <Package size={18} /> My Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-5 py-2.5 text-warm-200 hover:text-primary-400 hover:bg-warm-700 transition sm:hidden"
                        >
                          <Heart size={18} /> Wishlist
                        </Link>
                        {(session.user as any)?.role === "admin" && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-5 py-2.5 text-warm-200 hover:text-primary-400 hover:bg-warm-700 transition"
                          >
                            <LayoutDashboard size={18} /> Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            signOut({ callbackUrl: "/" });
                          }}
                          className="flex items-center gap-3 px-5 py-2.5 text-warm-200 hover:text-red-400 hover:bg-warm-700 transition w-full"
                        >
                          <LogOut size={18} /> Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-5 py-2.5 text-warm-200 hover:text-primary-400 hover:bg-warm-700 transition"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-5 py-2.5 text-warm-200 hover:text-primary-400 hover:bg-warm-700 transition"
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className="text-warm-200 hover:text-primary-400 transition p-1.5 sm:p-2 relative"
                aria-label="Cart"
              >
                <ShoppingBag size={18} className="sm:hidden" />
                <ShoppingBag size={20} className="hidden sm:block" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-primary-500 text-white text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-medium">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile search bar (toggled) */}
          {searchOpen && (
            <form onSubmit={handleSearch} className="lg:hidden mt-3 flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tees..."
                className="sketchy-border-light flex-1 px-3 sm:px-4 py-2 bg-warm-800 text-warm-100 placeholder-warm-400 outline-none focus:border-primary-500 transition"
                autoFocus
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-sm transition font-medium text-sm"
              >
                Go
              </button>
            </form>
          )}
        </div>
      </nav>

      {/* ===== Mobile Menu (slide-in from left) ===== */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Sliding panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] sm:w-72 bg-warm-900 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-warm-700">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="brand-name text-2xl text-warm-100"
          >
            MYOTEES
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-warm-200 hover:text-primary-400 transition p-1"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Panel links */}
        <div className="px-5 py-4 space-y-1 overflow-y-auto h-[calc(100%-73px)]">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 text-warm-200 hover:text-primary-400 font-medium transition"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 text-warm-200 hover:text-primary-400 font-medium transition"
          >
            All Products
          </Link>

          {/* Category divider */}
          <div className="pt-2 pb-1">
            <span className="text-xs uppercase tracking-wider text-warm-500">
              Categories
            </span>
          </div>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 pl-2 text-warm-300 hover:text-primary-400 font-caveat text-lg transition"
            >
              {cat.name}
            </Link>
          ))}

          <div className="border-t border-warm-700 my-3" />

          <Link
            href="/products?sort=newest"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 text-warm-200 hover:text-primary-400 font-medium transition"
          >
            New Arrivals
          </Link>
          <Link
            href="/products?featured=true"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 text-warm-200 hover:text-primary-400 font-medium transition"
          >
            Featured
          </Link>
          <Link
            href="/wishlist"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-3 text-warm-200 hover:text-primary-400 font-medium transition"
          >
            <Heart size={18} /> Wishlist
          </Link>

          <div className="border-t border-warm-700 my-3" />

          {/* Session links in mobile */}
          {session ? (
            <>
              <div className="py-2">
                <p className="font-medium text-warm-100 truncate">
                  {session.user?.name}
                </p>
                <p className="text-sm text-warm-400 truncate">
                  {session.user?.email}
                </p>
              </div>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2.5 text-warm-200 hover:text-primary-400 transition"
              >
                <UserCircle size={18} /> My Account
              </Link>
              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2.5 text-warm-200 hover:text-primary-400 transition"
              >
                <Package size={18} /> My Orders
              </Link>
              {(session.user as any)?.role === "admin" && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2.5 text-warm-200 hover:text-primary-400 transition"
                >
                  <LayoutDashboard size={18} /> Admin Panel
                </Link>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="flex items-center gap-3 py-2.5 text-warm-200 hover:text-red-400 transition w-full"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-warm-200 hover:text-primary-400 transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-warm-200 hover:text-primary-400 transition"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
