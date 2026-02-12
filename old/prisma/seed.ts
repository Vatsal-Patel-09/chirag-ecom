import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.coupon.deleteMany();

  const coupons = await prisma.coupon.createMany({
    data: [
      { code: 'SAVE10', discount: 10, isActive: true },
      { code: 'FIRSTORDER', discount: 15, isActive: true },
      { code: 'WELCOME20', discount: 20, isActive: true },
      { code: 'MEGA50', discount: 50, isActive: true },
    ],
  });

  console.log(`✅ Created ${coupons.count} coupons`);

  const products = [
  {
    "name": "Classic Black Tee",
    "description": "High-quality black tee for men. Perfect for casual wear.",
    "price": 15.99,
    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    ],
    "category": "Men",
    "subcategory": "Casual",
    "size": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Black",
    "stock": 25,
    "inStock": true,
    "rating": 4.3,
    "reviews": 50,
    "isNew": true,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Premium White Shirt",
    "description": "High-quality white shirt for women. Perfect for casual wear.",
    "price": 17.49,
    "image": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500",
    "images": [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500"
    ],
    "category": "Women",
    "subcategory": "Casual",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "White",
    "stock": 32,
    "inStock": true,
    "rating": 4.4,
    "reviews": 63,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Vintage Navy Top",
    "description": "High-quality navy top for unisex. Perfect for casual wear.",
    "price": 18.99,
    "image": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500",
    "images": [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Casual",
    "size": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Navy",
    "stock": 39,
    "inStock": true,
    "rating": 4.5,
    "reviews": 76,
    "isNew": false,
    "isSale": true,
    "discount": 15
  },
  {
    "name": "Modern Gray Jersey",
    "description": "High-quality gray jersey for kids. Perfect for casual wear.",
    "price": 20.49,
    "image": "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500",
    "images": [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500"
    ],
    "category": "Kids",
    "subcategory": "Casual",
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Gray",
    "stock": 46,
    "inStock": true,
    "rating": 4.6,
    "reviews": 89,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Essential Red Tank",
    "description": "High-quality red tank for men. Perfect for athletic wear.",
    "price": 21.99,
    "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500",
    "images": [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500"
    ],
    "category": "Men",
    "subcategory": "Athletic",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Red",
    "stock": 53,
    "inStock": true,
    "rating": 4.7,
    "reviews": 102,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Comfort Blue Crew Neck",
    "description": "High-quality blue crew neck for women. Perfect for athletic wear.",
    "price": 23.49,
    "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",
    "images": [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500"
    ],
    "category": "Women",
    "subcategory": "Athletic",
    "size": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Blue",
    "stock": 60,
    "inStock": true,
    "rating": 4.8,
    "reviews": 115,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Stylish Green V-Neck",
    "description": "High-quality green v-neck for unisex. Perfect for athletic wear.",
    "price": 24.99,
    "image": "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500",
    "images": [
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Athletic",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Green",
    "stock": 27,
    "inStock": true,
    "rating": 4.9,
    "reviews": 128,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Trendy Pink Henley",
    "description": "High-quality pink henley for kids. Perfect for athletic wear.",
    "price": 26.49,
    "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
    "images": [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"
    ],
    "category": "Kids",
    "subcategory": "Athletic",
    "size": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Pink",
    "stock": 0,
    "inStock": false,
    "rating": 4.3,
    "reviews": 141,
    "isNew": false,
    "isSale": true,
    "discount": 15
  },
  {
    "name": "Urban Purple Tee",
    "description": "High-quality purple tee for men. Perfect for graphic wear.",
    "price": 27.99,
    "image": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
    "images": [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"
    ],
    "category": "Men",
    "subcategory": "Graphic",
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Purple",
    "stock": 41,
    "inStock": true,
    "rating": 4.4,
    "reviews": 154,
    "isNew": true,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Retro Yellow Shirt",
    "description": "High-quality yellow shirt for women. Perfect for graphic wear.",
    "price": 29.49,
    "image": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500",
    "images": [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500"
    ],
    "category": "Women",
    "subcategory": "Graphic",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Yellow",
    "stock": 48,
    "inStock": true,
    "rating": 4.5,
    "reviews": 167,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Classic Orange Top",
    "description": "High-quality orange top for unisex. Perfect for graphic wear.",
    "price": 30.99,
    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Graphic",
    "size": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Orange",
    "stock": 55,
    "inStock": true,
    "rating": 4.6,
    "reviews": 180,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Premium Burgundy Jersey",
    "description": "High-quality burgundy jersey for kids. Perfect for graphic wear.",
    "price": 32.49,
    "image": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500",
    "images": [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500"
    ],
    "category": "Kids",
    "subcategory": "Graphic",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Burgundy",
    "stock": 62,
    "inStock": true,
    "rating": 4.7,
    "reviews": 193,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Vintage Olive Tank",
    "description": "High-quality olive tank for men. Perfect for formal wear.",
    "price": 33.99,
    "image": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500",
    "images": [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500"
    ],
    "category": "Men",
    "subcategory": "Formal",
    "size": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Olive",
    "stock": 29,
    "inStock": true,
    "rating": 4.8,
    "reviews": 206,
    "isNew": false,
    "isSale": true,
    "discount": 15
  },
  {
    "name": "Modern Teal Crew Neck",
    "description": "High-quality teal crew neck for women. Perfect for formal wear.",
    "price": 35.49,
    "image": "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500",
    "images": [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500"
    ],
    "category": "Women",
    "subcategory": "Formal",
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Teal",
    "stock": 36,
    "inStock": true,
    "rating": 4.9,
    "reviews": 219,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Essential Coral V-Neck",
    "description": "High-quality coral v-neck for unisex. Perfect for formal wear.",
    "price": 36.99,
    "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500",
    "images": [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Formal",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Coral",
    "stock": 43,
    "inStock": true,
    "rating": 4.3,
    "reviews": 232,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Comfort Black Henley",
    "description": "High-quality black henley for kids. Perfect for formal wear.",
    "price": 38.49,
    "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",
    "images": [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500"
    ],
    "category": "Kids",
    "subcategory": "Formal",
    "size": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Black",
    "stock": 50,
    "inStock": true,
    "rating": 4.4,
    "reviews": 245,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Stylish White Tee",
    "description": "High-quality white tee for men. Perfect for casual wear.",
    "price": 39.99,
    "image": "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500",
    "images": [
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500"
    ],
    "category": "Men",
    "subcategory": "Casual",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "White",
    "stock": 57,
    "inStock": true,
    "rating": 4.5,
    "reviews": 258,
    "isNew": true,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Trendy Navy Shirt",
    "description": "High-quality navy shirt for women. Perfect for casual wear.",
    "price": 41.49,
    "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
    "images": [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"
    ],
    "category": "Women",
    "subcategory": "Casual",
    "size": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Navy",
    "stock": 64,
    "inStock": true,
    "rating": 4.6,
    "reviews": 271,
    "isNew": false,
    "isSale": true,
    "discount": 15
  },
  {
    "name": "Urban Gray Top",
    "description": "High-quality gray top for unisex. Perfect for casual wear.",
    "price": 42.99,
    "image": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
    "images": [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Casual",
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Gray",
    "stock": 31,
    "inStock": true,
    "rating": 4.7,
    "reviews": 284,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Retro Red Jersey",
    "description": "High-quality red jersey for kids. Perfect for casual wear.",
    "price": 44.49,
    "image": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500",
    "images": [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500"
    ],
    "category": "Kids",
    "subcategory": "Casual",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Red",
    "stock": 0,
    "inStock": false,
    "rating": 4.8,
    "reviews": 297,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Classic Blue Tank",
    "description": "High-quality blue tank for men. Perfect for athletic wear.",
    "price": 15.99,
    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    ],
    "category": "Men",
    "subcategory": "Athletic",
    "size": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Blue",
    "stock": 45,
    "inStock": true,
    "rating": 4.9,
    "reviews": 310,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Premium Green Crew Neck",
    "description": "High-quality green crew neck for women. Perfect for athletic wear.",
    "price": 17.49,
    "image": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500",
    "images": [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500"
    ],
    "category": "Women",
    "subcategory": "Athletic",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Green",
    "stock": 52,
    "inStock": true,
    "rating": 4.3,
    "reviews": 323,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Vintage Pink V-Neck",
    "description": "High-quality pink v-neck for unisex. Perfect for athletic wear.",
    "price": 18.99,
    "image": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500",
    "images": [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Athletic",
    "size": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Pink",
    "stock": 59,
    "inStock": true,
    "rating": 4.4,
    "reviews": 336,
    "isNew": false,
    "isSale": true,
    "discount": 15
  },
  {
    "name": "Modern Purple Henley",
    "description": "High-quality purple henley for kids. Perfect for athletic wear.",
    "price": 20.49,
    "image": "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500",
    "images": [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500"
    ],
    "category": "Kids",
    "subcategory": "Athletic",
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Purple",
    "stock": 26,
    "inStock": true,
    "rating": 4.5,
    "reviews": 349,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Essential Yellow Tee",
    "description": "High-quality yellow tee for men. Perfect for graphic wear.",
    "price": 21.99,
    "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500",
    "images": [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500"
    ],
    "category": "Men",
    "subcategory": "Graphic",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Yellow",
    "stock": 33,
    "inStock": true,
    "rating": 4.6,
    "reviews": 362,
    "isNew": true,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Comfort Orange Shirt",
    "description": "High-quality orange shirt for women. Perfect for graphic wear.",
    "price": 23.49,
    "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",
    "images": [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500"
    ],
    "category": "Women",
    "subcategory": "Graphic",
    "size": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Orange",
    "stock": 40,
    "inStock": true,
    "rating": 4.7,
    "reviews": 375,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Stylish Burgundy Top",
    "description": "High-quality burgundy top for unisex. Perfect for graphic wear.",
    "price": 24.99,
    "image": "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500",
    "images": [
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Graphic",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Burgundy",
    "stock": 47,
    "inStock": true,
    "rating": 4.8,
    "reviews": 388,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Trendy Olive Jersey",
    "description": "High-quality olive jersey for kids. Perfect for graphic wear.",
    "price": 26.49,
    "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
    "images": [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"
    ],
    "category": "Kids",
    "subcategory": "Graphic",
    "size": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Olive",
    "stock": 54,
    "inStock": true,
    "rating": 4.9,
    "reviews": 401,
    "isNew": false,
    "isSale": true,
    "discount": 15
  },
  {
    "name": "Urban Teal Tank",
    "description": "High-quality teal tank for men. Perfect for formal wear.",
    "price": 27.99,
    "image": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
    "images": [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"
    ],
    "category": "Men",
    "subcategory": "Formal",
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Teal",
    "stock": 61,
    "inStock": true,
    "rating": 4.3,
    "reviews": 414,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Retro Coral Crew Neck",
    "description": "High-quality coral crew neck for women. Perfect for formal wear.",
    "price": 29.49,
    "image": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500",
    "images": [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500"
    ],
    "category": "Women",
    "subcategory": "Formal",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Coral",
    "stock": 28,
    "inStock": true,
    "rating": 4.4,
    "reviews": 427,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Classic Black V-Neck",
    "description": "High-quality black v-neck for unisex. Perfect for formal wear.",
    "price": 30.99,
    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Formal",
    "size": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Black",
    "stock": 35,
    "inStock": true,
    "rating": 4.5,
    "reviews": 440,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Premium White Henley",
    "description": "High-quality white henley for kids. Perfect for formal wear.",
    "price": 32.49,
    "image": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500",
    "images": [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500"
    ],
    "category": "Kids",
    "subcategory": "Formal",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "White",
    "stock": 0,
    "inStock": false,
    "rating": 4.6,
    "reviews": 53,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Vintage Navy Tee",
    "description": "High-quality navy tee for men. Perfect for casual wear.",
    "price": 33.99,
    "image": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500",
    "images": [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500"
    ],
    "category": "Men",
    "subcategory": "Casual",
    "size": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Navy",
    "stock": 49,
    "inStock": true,
    "rating": 4.7,
    "reviews": 66,
    "isNew": true,
    "isSale": true,
    "discount": 15
  },
  {
    "name": "Modern Gray Shirt",
    "description": "High-quality gray shirt for women. Perfect for casual wear.",
    "price": 35.49,
    "image": "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500",
    "images": [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500"
    ],
    "category": "Women",
    "subcategory": "Casual",
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Gray",
    "stock": 56,
    "inStock": true,
    "rating": 4.8,
    "reviews": 79,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Essential Red Top",
    "description": "High-quality red top for unisex. Perfect for casual wear.",
    "price": 36.99,
    "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500",
    "images": [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Casual",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Red",
    "stock": 63,
    "inStock": true,
    "rating": 4.9,
    "reviews": 92,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Comfort Blue Jersey",
    "description": "High-quality blue jersey for kids. Perfect for casual wear.",
    "price": 38.49,
    "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",
    "images": [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500"
    ],
    "category": "Kids",
    "subcategory": "Casual",
    "size": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Blue",
    "stock": 30,
    "inStock": true,
    "rating": 4.3,
    "reviews": 105,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Stylish Green Tank",
    "description": "High-quality green tank for men. Perfect for athletic wear.",
    "price": 39.99,
    "image": "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500",
    "images": [
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500"
    ],
    "category": "Men",
    "subcategory": "Athletic",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Green",
    "stock": 37,
    "inStock": true,
    "rating": 4.4,
    "reviews": 118,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Trendy Pink Crew Neck",
    "description": "High-quality pink crew neck for women. Perfect for athletic wear.",
    "price": 41.49,
    "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
    "images": [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"
    ],
    "category": "Women",
    "subcategory": "Athletic",
    "size": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Pink",
    "stock": 44,
    "inStock": true,
    "rating": 4.5,
    "reviews": 131,
    "isNew": false,
    "isSale": true,
    "discount": 15
  },
  {
    "name": "Urban Purple V-Neck",
    "description": "High-quality purple v-neck for unisex. Perfect for athletic wear.",
    "price": 42.99,
    "image": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
    "images": [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Athletic",
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Purple",
    "stock": 51,
    "inStock": true,
    "rating": 4.6,
    "reviews": 144,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Retro Yellow Henley",
    "description": "High-quality yellow henley for kids. Perfect for athletic wear.",
    "price": 44.49,
    "image": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500",
    "images": [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500"
    ],
    "category": "Kids",
    "subcategory": "Athletic",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Yellow",
    "stock": 58,
    "inStock": true,
    "rating": 4.7,
    "reviews": 157,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Classic Orange Tee",
    "description": "High-quality orange tee for men. Perfect for graphic wear.",
    "price": 15.99,
    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    ],
    "category": "Men",
    "subcategory": "Graphic",
    "size": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Orange",
    "stock": 25,
    "inStock": true,
    "rating": 4.8,
    "reviews": 170,
    "isNew": true,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Premium Burgundy Shirt",
    "description": "High-quality burgundy shirt for women. Perfect for graphic wear.",
    "price": 17.49,
    "image": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500",
    "images": [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500"
    ],
    "category": "Women",
    "subcategory": "Graphic",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Burgundy",
    "stock": 32,
    "inStock": true,
    "rating": 4.9,
    "reviews": 183,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Vintage Olive Top",
    "description": "High-quality olive top for unisex. Perfect for graphic wear.",
    "price": 18.99,
    "image": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500",
    "images": [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Graphic",
    "size": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Olive",
    "stock": 39,
    "inStock": true,
    "rating": 4.3,
    "reviews": 196,
    "isNew": false,
    "isSale": true,
    "discount": 15
  },
  {
    "name": "Modern Teal Jersey",
    "description": "High-quality teal jersey for kids. Perfect for graphic wear.",
    "price": 20.49,
    "image": "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500",
    "images": [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500"
    ],
    "category": "Kids",
    "subcategory": "Graphic",
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Teal",
    "stock": 0,
    "inStock": false,
    "rating": 4.4,
    "reviews": 209,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Essential Coral Tank",
    "description": "High-quality coral tank for men. Perfect for formal wear.",
    "price": 21.99,
    "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500",
    "images": [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500"
    ],
    "category": "Men",
    "subcategory": "Formal",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Coral",
    "stock": 53,
    "inStock": true,
    "rating": 4.5,
    "reviews": 222,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Comfort Black Crew Neck",
    "description": "High-quality black crew neck for women. Perfect for formal wear.",
    "price": 23.49,
    "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",
    "images": [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500"
    ],
    "category": "Women",
    "subcategory": "Formal",
    "size": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Black",
    "stock": 60,
    "inStock": true,
    "rating": 4.6,
    "reviews": 235,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Stylish White V-Neck",
    "description": "High-quality white v-neck for unisex. Perfect for formal wear.",
    "price": 24.99,
    "image": "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500",
    "images": [
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Formal",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "White",
    "stock": 27,
    "inStock": true,
    "rating": 4.7,
    "reviews": 248,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Trendy Navy Henley",
    "description": "High-quality navy henley for kids. Perfect for formal wear.",
    "price": 26.49,
    "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
    "images": [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"
    ],
    "category": "Kids",
    "subcategory": "Formal",
    "size": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Navy",
    "stock": 34,
    "inStock": true,
    "rating": 4.8,
    "reviews": 261,
    "isNew": false,
    "isSale": true,
    "discount": 15
  },
  {
    "name": "Urban Gray Tee",
    "description": "High-quality gray tee for men. Perfect for casual wear.",
    "price": 27.99,
    "image": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
    "images": [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"
    ],
    "category": "Men",
    "subcategory": "Casual",
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Gray",
    "stock": 41,
    "inStock": true,
    "rating": 4.9,
    "reviews": 274,
    "isNew": true,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Retro Red Shirt",
    "description": "High-quality red shirt for women. Perfect for casual wear.",
    "price": 29.49,
    "image": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500",
    "images": [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500"
    ],
    "category": "Women",
    "subcategory": "Casual",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Red",
    "stock": 48,
    "inStock": true,
    "rating": 4.3,
    "reviews": 287,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Classic Blue Top",
    "description": "High-quality blue top for unisex. Perfect for casual wear.",
    "price": 30.99,
    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Casual",
    "size": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Blue",
    "stock": 55,
    "inStock": true,
    "rating": 4.4,
    "reviews": 300,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Premium Green Jersey",
    "description": "High-quality green jersey for kids. Perfect for casual wear.",
    "price": 32.49,
    "image": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500",
    "images": [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500"
    ],
    "category": "Kids",
    "subcategory": "Casual",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Green",
    "stock": 62,
    "inStock": true,
    "rating": 4.5,
    "reviews": 313,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Vintage Pink Tank",
    "description": "High-quality pink tank for men. Perfect for athletic wear.",
    "price": 33.99,
    "image": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500",
    "images": [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500"
    ],
    "category": "Men",
    "subcategory": "Athletic",
    "size": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Pink",
    "stock": 29,
    "inStock": true,
    "rating": 4.6,
    "reviews": 326,
    "isNew": false,
    "isSale": true,
    "discount": 15
  },
  {
    "name": "Modern Purple Crew Neck",
    "description": "High-quality purple crew neck for women. Perfect for athletic wear.",
    "price": 35.49,
    "image": "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500",
    "images": [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500"
    ],
    "category": "Women",
    "subcategory": "Athletic",
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Purple",
    "stock": 36,
    "inStock": true,
    "rating": 4.7,
    "reviews": 339,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Essential Yellow V-Neck",
    "description": "High-quality yellow v-neck for unisex. Perfect for athletic wear.",
    "price": 36.99,
    "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500",
    "images": [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Athletic",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Yellow",
    "stock": 43,
    "inStock": true,
    "rating": 4.8,
    "reviews": 352,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Comfort Orange Henley",
    "description": "High-quality orange henley for kids. Perfect for athletic wear.",
    "price": 38.49,
    "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",
    "images": [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500"
    ],
    "category": "Kids",
    "subcategory": "Athletic",
    "size": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Orange",
    "stock": 0,
    "inStock": false,
    "rating": 4.9,
    "reviews": 365,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Stylish Burgundy Tee",
    "description": "High-quality burgundy tee for men. Perfect for graphic wear.",
    "price": 39.99,
    "image": "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500",
    "images": [
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500"
    ],
    "category": "Men",
    "subcategory": "Graphic",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "color": "Burgundy",
    "stock": 57,
    "inStock": true,
    "rating": 4.3,
    "reviews": 378,
    "isNew": true,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Trendy Olive Shirt",
    "description": "High-quality olive shirt for women. Perfect for graphic wear.",
    "price": 41.49,
    "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
    "images": [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"
    ],
    "category": "Women",
    "subcategory": "Graphic",
    "size": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Olive",
    "stock": 64,
    "inStock": true,
    "rating": 4.4,
    "reviews": 391,
    "isNew": false,
    "isSale": true,
    "discount": 15
  },
  {
    "name": "Urban Teal Top",
    "description": "High-quality teal top for unisex. Perfect for graphic wear.",
    "price": 42.99,
    "image": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
    "images": [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"
    ],
    "category": "Unisex",
    "subcategory": "Graphic",
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Teal",
    "stock": 31,
    "inStock": true,
    "rating": 4.5,
    "reviews": 404,
    "isNew": false,
    "isSale": false,
    "discount": 0
  },
  {
    "name": "Retro Coral Jersey",
    "description": "High-quality coral jersey for kids. Perfect for graphic wear.",
    "price": 44.49,
    "image": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500",
    "images": [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500"
    ],
    "category": "Kids",
    "subcategory": "Graphic",
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "color": "Coral",
    "stock": 38,
    "inStock": true,
    "rating": 4.6,
    "reviews": 417,
    "isNew": false,
    "isSale": false,
    "discount": 0
  }
];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`✅ Database seeded with ${products.length} products!`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
