export default function FAQPage() {
  const faqs = [
    { q: 'What is your shipping policy?', a: 'We offer free shipping on orders over $50. Standard shipping takes 5-7 working days.' },
    { q: 'What is your return policy?', a: 'You can return items within 30 days of purchase for a full refund.' },
    { q: 'How do I track my order?', a: 'Once shipped, you will receive an email with tracking information.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, debit cards, and digital wallets.' },
    { q: 'Are your products genuine?', a: 'Yes, all our products are 100% authentic and made from premium materials.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h1>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
