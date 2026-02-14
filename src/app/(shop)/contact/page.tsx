"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        toast.success(data.message);
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-20 text-center">
        <div className="sketchy-border bg-accent-100 w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-accent-600" />
        </div>
        <h1 className="text-3xl font-marker text-warm-900 mb-4">Message Sent!</h1>
        <p className="text-warm-500 mb-8 max-w-md mx-auto">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <Link
          href="/"
          className="inline-block sketchy-border bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 font-medium transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <nav className="flex items-center gap-2 text-sm font-caveat text-warm-500 mb-6">
        <Link href="/" className="hover:text-primary-600 transition">Home</Link>
        <span>~&gt;</span>
        <span className="text-warm-900">Contact</span>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-marker text-warm-900 mb-3">
          Get In Touch
        </h1>
        <p className="text-warm-500 max-w-2xl mx-auto">
          Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="sketchy-border-light bg-primary-50 p-6">
            <div className="w-12 h-12 sketchy-border-sm bg-primary-100 flex items-center justify-center mb-4">
              <Mail size={22} className="text-primary-600" />
            </div>
            <h3 className="font-semibold text-warm-900 mb-1">Email Us</h3>
            <a href="mailto:hello@myotees.in" className="text-primary-600 hover:underline text-sm">
              hello@myotees.in
            </a>
          </div>

          <div className="sketchy-border-light bg-accent-50 p-6">
            <div className="w-12 h-12 sketchy-border-sm bg-accent-100 flex items-center justify-center mb-4">
              <Phone size={22} className="text-accent-600" />
            </div>
            <h3 className="font-semibold text-warm-900 mb-1">Call Us</h3>
            <a href="tel:+919876543210" className="text-accent-600 hover:underline text-sm">
              +91 98765 43210
            </a>
          </div>

          <div className="sketchy-border-light bg-warm-50 p-6">
            <div className="w-12 h-12 sketchy-border-sm bg-warm-100 flex items-center justify-center mb-4">
              <MapPin size={22} className="text-warm-600" />
            </div>
            <h3 className="font-semibold text-warm-900 mb-1">Visit Us</h3>
            <p className="text-warm-500 text-sm">
              42 Linking Road, Bandra West,<br />Mumbai 400050
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-warm-300 sketchy-border-light focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-warm-300 sketchy-border-light focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-1.5">
              Subject
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="How can we help?"
              className="w-full px-4 py-3 border border-warm-300 sketchy-border-light focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-1.5">
              Message
            </label>
            <textarea
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us more about your inquiry..."
              className="w-full px-4 py-3 border border-warm-300 sketchy-border-light focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 sketchy-border bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 font-medium transition sketch-shadow-primary disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send size={18} /> Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
