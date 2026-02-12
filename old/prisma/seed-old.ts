import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing products
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  // Create T-shirt products
  const products = [
    {
      name: 'Classic Black T-Shirt',
      description: 'Premium quality 100% cotton black t-shirt. Perfect for everyday wear with a comfortable fit.',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      category: 'Men',
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      color: 'Black',
      stock: 50,
    },
    {
      name: 'White Essential Tee',
      description: 'Clean and simple white t-shirt made from soft breathable fabric. A wardrobe staple.',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500',
      category: 'Men',
      size: ['S', 'M', 'L', 'XL'],
      color: 'White',
      stock: 40,
    },
    {
      name: 'Navy Blue Crew Neck',
      description: 'Stylish navy blue crew neck t-shirt. Perfect blend of comfort and style.',
      price: 27.99,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
      category: 'Men',
      size: ['M', 'L', 'XL', 'XXL'],
      color: 'Navy Blue',
      stock: 35,
    },
    {
      name: 'Grey Heather Tee',
      description: 'Comfortable grey heather t-shirt with a modern fit. Great for casual outings.',
      price: 26.99,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
      category: 'Men',
      size: ['S', 'M', 'L', 'XL'],
      color: 'Grey',
      stock: 45,
    },
    {
      name: 'Red Athletic Tee',
      description: 'Moisture-wicking red athletic t-shirt. Perfect for workouts and active lifestyle.',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500',
      category: 'Sports',
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      color: 'Red',
      stock: 30,
    },
    {
      name: 'Olive Green Vintage Tee',
      description: 'Trendy olive green t-shirt with a vintage wash. Soft and comfortable.',
      price: 28.99,
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500',
      category: 'Men',
      size: ['S', 'M', 'L', 'XL'],
      color: 'Olive Green',
      stock: 25,
    },
    {
      name: 'Pink Women\'s Tee',
      description: 'Soft pink t-shirt designed for women. Flattering fit with premium fabric.',
      price: 25.99,
      image: 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=500',
      category: 'Women',
      size: ['XS', 'S', 'M', 'L', 'XL'],
      color: 'Pink',
      stock: 40,
    },
    {
      name: 'Burgundy V-Neck Tee',
      description: 'Elegant burgundy v-neck t-shirt. Perfect for a sophisticated casual look.',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500',
      category: 'Women',
      size: ['XS', 'S', 'M', 'L'],
      color: 'Burgundy',
      stock: 20,
    },
    {
      name: 'Yellow Sunshine Tee',
      description: 'Bright yellow t-shirt to brighten your day. Fun and vibrant design.',
      price: 23.99,
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500',
      category: 'Casual',
      size: ['S', 'M', 'L', 'XL'],
      color: 'Yellow',
      stock: 30,
    },
    {
      name: 'Charcoal Premium Tee',
      description: 'Premium charcoal t-shirt with superior quality fabric. Durable and stylish.',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=500',
      category: 'Premium',
      size: ['M', 'L', 'XL', 'XXL'],
      color: 'Charcoal',
      stock: 15,
    },
    {
      name: 'Turquoise Beach Tee',
      description: 'Cool turquoise t-shirt perfect for beach days and summer vibes.',
      price: 26.99,
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500',
      category: 'Casual',
      size: ['S', 'M', 'L', 'XL'],
      color: 'Turquoise',
      stock: 35,
    },
    {
      name: 'Forest Green Eco Tee',
      description: 'Sustainable forest green t-shirt made from organic cotton. Eco-friendly choice.',
      price: 31.99,
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500',
      category: 'Eco',
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      color: 'Forest Green',
      stock: 25,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('✅ Database seeded successfully with', products.length, 'products!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
