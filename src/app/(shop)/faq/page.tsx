"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What sizes do you offer?",
    answer:
      "We offer sizes XS through XXL across most of our collection. Each product page has a detailed size chart to help you find the perfect fit. If you're between sizes, we recommend sizing up for a relaxed fit or down for a more fitted look.",
  },
  {
    question: "What materials are your t-shirts made of?",
    answer:
      "Our t-shirts are crafted from premium fabrics including 100% organic cotton, cotton-polyester blends, and performance moisture-wicking materials. Each product listing specifies the exact fabric composition.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order ships, you'll receive a confirmation email with tracking details. You can also check your order status anytime by visiting the 'My Orders' section in your account.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day hassle-free return policy. If you're not completely satisfied with your purchase, you can return unworn items with tags attached for a full refund or exchange. Simply contact our support team to initiate a return.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes! We offer free standard shipping on all orders over $50. For orders under $50, a flat rate shipping fee of $4.99 applies. Express and overnight shipping options are also available at checkout.",
  },
  {
    question: "How do I apply a coupon code?",
    answer:
      "During checkout, you'll see a 'Coupon Code' field in the order summary section. Enter your code and click 'Apply' to see the discount reflected in your total. Only one coupon can be used per order.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "You can modify or cancel your order within 2 hours of placing it. After that, the order may have already been processed for shipping. Contact our support team as soon as possible if you need to make changes.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we ship within the United States. We're working on expanding our shipping to international destinations. Sign up for our newsletter to stay updated on when international shipping becomes available.",
  },
  {
    question: "How do I care for my t-shirts?",
    answer:
      "For best results, machine wash cold with similar colors, tumble dry low, and avoid bleach. Turn graphic tees inside out before washing to preserve the print. Iron on low heat if needed, avoiding any printed areas.",
  },
  {
    question: "Do you offer bulk or custom orders?",
    answer:
      "Yes! We offer bulk pricing for orders of 20+ items and can arrange custom printing for businesses, events, or teams. Contact us at hello@tshirtstore.com for a custom quote.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-600 transition">Home</Link>
        <span>/</span>
        <span className="text-gray-900">FAQ</span>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Got questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for,
          feel free to <Link href="/contact" className="text-purple-600 hover:underline">contact us</Link>.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl overflow-hidden transition-shadow hover:shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex items-center justify-between w-full px-6 py-5 text-left"
            >
              <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
              <ChevronDown
                size={20}
                className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-purple-50 rounded-2xl p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h2>
        <p className="text-gray-500 mb-6">We&apos;re here to help. Reach out to our team anytime.</p>
        <Link
          href="/contact"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
