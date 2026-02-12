import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { hash } from "bcryptjs";
import * as schema from "./schema";

// Load .env.local
config({ path: ".env.local" });

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await hash("admin123", 12);
  const [adminUser] = await db
    .insert(schema.users)
    .values({
      name: "Admin",
      email: "admin@tshirtstore.com",
      password: hashedPassword,
      role: "admin",
    })
    .returning();
  console.log("✅ Admin user created");

  // Create categories
  const categoryData = [
    { name: "Men", slug: "men", description: "Premium t-shirts for men", imageUrl: "/images/product/1.jpg" },
    { name: "Women", slug: "women", description: "Stylish t-shirts for women", imageUrl: "/images/product/10.jpg" },
    { name: "Unisex", slug: "unisex", description: "Gender-neutral t-shirts for everyone", imageUrl: "/images/product/20.jpg" },
    { name: "Kids", slug: "kids", description: "Fun and comfortable t-shirts for kids", imageUrl: "/images/product/30.jpg" },
    { name: "Sports", slug: "sports", description: "Performance t-shirts for active lifestyles", imageUrl: "/images/product/40.jpg" },
    { name: "Premium", slug: "premium", description: "Luxury t-shirts made from the finest materials", imageUrl: "/images/product/5.jpg" },
  ];

  const insertedCategories = await db
    .insert(schema.categories)
    .values(categoryData)
    .returning();
  console.log("✅ Categories created");

  const catMap: Record<string, string> = {};
  insertedCategories.forEach((c) => { catMap[c.slug] = c.id; });

  // Create coupons
  await db.insert(schema.coupons).values([
    { code: "SAVE10", discount: 10 },
    { code: "FIRSTORDER", discount: 15 },
    { code: "WELCOME20", discount: 20 },
    { code: "MEGA50", discount: 50 },
  ]);
  console.log("✅ Coupons created");

  // Create products
  const productData = [
    // Men (10 products)
    { name: "Classic Black Crew Neck", slug: "classic-black-crew-neck", description: "A timeless black crew neck t-shirt made from 100% combed cotton. Soft, breathable, and perfect for everyday wear.", price: "24.99", categoryId: catMap["men"], images: ["/images/product/1.jpg", "/images/product/2.jpg"], sizes: ["S", "M", "L", "XL", "XXL"], color: "Black", stock: 120, isFeatured: true, material: "100% Cotton", rating: "4.8", reviewCount: 245, isNew: false },
    { name: "White Essential Tee", slug: "white-essential-tee", description: "The perfect white t-shirt. Premium cotton blend with a modern slim fit.", price: "22.99", categoryId: catMap["men"], images: ["/images/product/3.jpg", "/images/product/4.jpg"], sizes: ["XS", "S", "M", "L", "XL", "XXL"], color: "White", stock: 150, isFeatured: true, material: "Cotton Blend", rating: "4.7", reviewCount: 189, isNew: false },
    { name: "Navy Blue Henley", slug: "navy-blue-henley", description: "A stylish henley-neck t-shirt in deep navy blue with a three-button placket.", price: "29.99", categoryId: catMap["men"], images: ["/images/product/5.jpg", "/images/product/6.jpg"], sizes: ["S", "M", "L", "XL"], color: "Navy", stock: 80, isFeatured: true, material: "Cotton Jersey", rating: "4.6", reviewCount: 132, isNew: true },
    { name: "Charcoal V-Neck Tee", slug: "charcoal-v-neck-tee", description: "A sophisticated v-neck t-shirt in charcoal grey. Made from ultra-soft Supima cotton.", price: "26.99", categoryId: catMap["men"], images: ["/images/product/7.jpg"], sizes: ["S", "M", "L", "XL", "XXL"], color: "Gray", stock: 95, isFeatured: false, material: "Supima Cotton", rating: "4.5", reviewCount: 98, isNew: false },
    { name: "Olive Green Pocket Tee", slug: "olive-green-pocket-tee", description: "A relaxed-fit pocket tee in earthy olive green with rolled sleeves.", price: "27.99", categoryId: catMap["men"], images: ["/images/product/8.jpg", "/images/product/9.jpg"], sizes: ["M", "L", "XL", "XXL"], color: "Olive", stock: 65, isFeatured: false, material: "Organic Cotton", rating: "4.4", reviewCount: 76, isNew: false },
    { name: "Red Athletic Fit Tee", slug: "red-athletic-fit-tee", description: "A bold red t-shirt with an athletic fit. Quick-dry fabric for workouts or casual wear.", price: "28.99", compareAtPrice: "34.99", categoryId: catMap["men"], images: ["/images/product/10.jpg", "/images/product/11.jpg"], sizes: ["S", "M", "L", "XL"], color: "Red", stock: 55, isFeatured: false, material: "Polyester Blend", rating: "4.3", reviewCount: 67, isNew: false },
    { name: "Burgundy Premium Tee", slug: "burgundy-premium-tee", description: "A luxurious burgundy t-shirt crafted from mercerized cotton with a refined finish.", price: "34.99", categoryId: catMap["men"], images: ["/images/product/12.jpg"], sizes: ["S", "M", "L", "XL"], color: "Burgundy", stock: 40, isFeatured: true, material: "Mercerized Cotton", rating: "4.9", reviewCount: 156, isNew: true },
    { name: "Steel Blue Long Sleeve", slug: "steel-blue-long-sleeve", description: "A versatile long-sleeve t-shirt in steel blue, perfect for layering.", price: "32.99", categoryId: catMap["men"], images: ["/images/product/13.jpg", "/images/product/14.jpg"], sizes: ["S", "M", "L", "XL", "XXL"], color: "Blue", stock: 70, isFeatured: false, material: "Cotton Jersey", rating: "4.5", reviewCount: 88, isNew: false },
    { name: "Graphic Street Art Tee", slug: "graphic-street-art-tee", description: "A bold graphic t-shirt with original street art. Eco-friendly water-based inks.", price: "29.99", categoryId: catMap["men"], images: ["/images/product/15.jpg", "/images/product/16.jpg"], sizes: ["S", "M", "L", "XL"], color: "Black", stock: 85, isFeatured: true, material: "Ring-Spun Cotton", rating: "4.7", reviewCount: 203, isNew: true },
    { name: "Vintage Wash Grey Tee", slug: "vintage-wash-grey-tee", description: "A pre-washed grey t-shirt with a lived-in vintage look.", price: "25.99", categoryId: catMap["men"], images: ["/images/product/17.jpg"], sizes: ["S", "M", "L", "XL", "XXL"], color: "Gray", stock: 100, isFeatured: false, material: "Cotton", rating: "4.4", reviewCount: 71, isNew: false },

    // Women (8 products)
    { name: "Blush Pink Relaxed Fit", slug: "blush-pink-relaxed-fit", description: "A beautiful blush pink t-shirt with a relaxed, oversized fit. Ultra-soft modal blend.", price: "26.99", categoryId: catMap["women"], images: ["/images/product/18.jpg", "/images/product/19.jpg"], sizes: ["XS", "S", "M", "L", "XL"], color: "Pink", stock: 90, isFeatured: true, material: "Modal Blend", rating: "4.8", reviewCount: 178, isNew: true },
    { name: "White Crop Top Tee", slug: "white-crop-top-tee", description: "A trendy white crop top with a modern cut. Soft cotton with a touch of stretch.", price: "23.99", categoryId: catMap["women"], images: ["/images/product/20.jpg", "/images/product/21.jpg"], sizes: ["XS", "S", "M", "L"], color: "White", stock: 75, isFeatured: true, material: "Cotton Spandex", rating: "4.6", reviewCount: 145, isNew: false },
    { name: "Lavender Scoop Neck", slug: "lavender-scoop-neck", description: "An elegant lavender scoop neck t-shirt with a feminine drape.", price: "25.99", categoryId: catMap["women"], images: ["/images/product/22.jpg", "/images/product/23.jpg"], sizes: ["XS", "S", "M", "L", "XL"], color: "Purple", stock: 60, isFeatured: false, material: "Rayon Blend", rating: "4.5", reviewCount: 92, isNew: false },
    { name: "Black Off-Shoulder Tee", slug: "black-off-shoulder-tee", description: "A chic black off-shoulder t-shirt with instant glamour.", price: "28.99", categoryId: catMap["women"], images: ["/images/product/24.jpg"], sizes: ["XS", "S", "M", "L"], color: "Black", stock: 50, isFeatured: false, material: "Cotton Elastane", rating: "4.7", reviewCount: 113, isNew: true },
    { name: "Coral Tie-Front Tee", slug: "coral-tie-front-tee", description: "A vibrant coral t-shirt with a playful tie-front detail.", price: "24.99", categoryId: catMap["women"], images: ["/images/product/25.jpg", "/images/product/26.jpg"], sizes: ["XS", "S", "M", "L", "XL"], color: "Coral", stock: 65, isFeatured: true, material: "Cotton", rating: "4.4", reviewCount: 87, isNew: false },
    { name: "Sage Green Oversized Tee", slug: "sage-green-oversized-tee", description: "A trendy sage green oversized t-shirt with dropped shoulders.", price: "27.99", compareAtPrice: "34.99", categoryId: catMap["women"], images: ["/images/product/27.jpg", "/images/product/28.jpg"], sizes: ["S", "M", "L", "XL"], color: "Green", stock: 80, isFeatured: false, material: "Organic Cotton", rating: "4.6", reviewCount: 104, isNew: false },
    { name: "Striped Breton Tee", slug: "striped-breton-tee", description: "A classic striped Breton-style t-shirt in navy and white.", price: "29.99", categoryId: catMap["women"], images: ["/images/product/29.jpg"], sizes: ["XS", "S", "M", "L", "XL"], color: "Navy", stock: 55, isFeatured: true, material: "Cotton Jersey", rating: "4.8", reviewCount: 167, isNew: false },
    { name: "Dusty Rose V-Neck", slug: "dusty-rose-v-neck", description: "A flattering dusty rose v-neck with day-to-night versatility.", price: "26.99", categoryId: catMap["women"], images: ["/images/product/30.jpg", "/images/product/31.jpg"], sizes: ["XS", "S", "M", "L"], color: "Pink", stock: 45, isFeatured: false, material: "Modal", rating: "4.5", reviewCount: 79, isNew: true },

    // Unisex (6 products)
    { name: "Tie-Dye Rainbow Tee", slug: "tie-dye-rainbow-tee", description: "A vibrant hand-dyed tie-dye t-shirt. Each piece is unique. Oversized fit.", price: "31.99", categoryId: catMap["unisex"], images: ["/images/product/32.jpg", "/images/product/33.jpg"], sizes: ["S", "M", "L", "XL", "XXL"], color: "Multi", stock: 40, isFeatured: true, material: "100% Cotton", rating: "4.7", reviewCount: 198, isNew: true },
    { name: "Minimalist Logo Tee", slug: "minimalist-logo-tee", description: "A clean minimalist t-shirt with a small embroidered logo.", price: "24.99", categoryId: catMap["unisex"], images: ["/images/product/34.jpg", "/images/product/35.jpg"], sizes: ["XS", "S", "M", "L", "XL", "XXL"], color: "White", stock: 200, isFeatured: true, material: "Cotton", rating: "4.6", reviewCount: 234, isNew: false },
    { name: "Heavyweight Black Tee", slug: "heavyweight-black-tee", description: "A premium 280 GSM heavyweight t-shirt in jet black. Built to last.", price: "34.99", categoryId: catMap["unisex"], images: ["/images/product/36.jpg"], sizes: ["S", "M", "L", "XL", "XXL", "XXXL"], color: "Black", stock: 150, isFeatured: true, material: "Heavyweight Cotton", rating: "4.9", reviewCount: 312, isNew: false },
    { name: "Stone Washed Khaki Tee", slug: "stone-washed-khaki-tee", description: "A garment-dyed khaki t-shirt with rich color that improves with every wash.", price: "28.99", categoryId: catMap["unisex"], images: ["/images/product/37.jpg", "/images/product/38.jpg"], sizes: ["S", "M", "L", "XL", "XXL"], color: "Khaki", stock: 85, isFeatured: false, material: "Garment-Dyed Cotton", rating: "4.5", reviewCount: 89, isNew: false },
    { name: "Acid Wash Denim Tee", slug: "acid-wash-denim-tee", description: "A trendy acid wash t-shirt with distressed details for an edgy look.", price: "32.99", compareAtPrice: "39.99", categoryId: catMap["unisex"], images: ["/images/product/39.jpg", "/images/product/40.jpg"], sizes: ["S", "M", "L", "XL"], color: "Blue", stock: 55, isFeatured: false, material: "Cotton", rating: "4.3", reviewCount: 56, isNew: true },
    { name: "Eco-Friendly Hemp Tee", slug: "eco-friendly-hemp-tee", description: "Eco-conscious t-shirt from organic cotton and hemp. Better for the planet.", price: "36.99", categoryId: catMap["unisex"], images: ["/images/product/41.jpg"], sizes: ["S", "M", "L", "XL", "XXL"], color: "Natural", stock: 70, isFeatured: false, material: "Cotton/Hemp Blend", rating: "4.6", reviewCount: 94, isNew: true },

    // Kids (4 products)
    { name: "Superhero Graphic Kids Tee", slug: "superhero-graphic-kids-tee", description: "A fun superhero-themed t-shirt that kids will love! Bright colors and soft cotton.", price: "16.99", categoryId: catMap["kids"], images: ["/images/product/42.jpg", "/images/product/43.jpg"], sizes: ["XS", "S", "M", "L"], color: "Blue", stock: 100, isFeatured: true, material: "100% Cotton", rating: "4.8", reviewCount: 156, isNew: false },
    { name: "Dinosaur Print Kids Tee", slug: "dinosaur-print-kids-tee", description: "A playful dinosaur print t-shirt in vibrant green. Pre-shrunk for lasting fit.", price: "15.99", categoryId: catMap["kids"], images: ["/images/product/44.jpg", "/images/product/45.jpg"], sizes: ["XS", "S", "M", "L"], color: "Green", stock: 85, isFeatured: true, material: "Pre-Shrunk Cotton", rating: "4.7", reviewCount: 134, isNew: true },
    { name: "Rainbow Stripe Kids Tee", slug: "rainbow-stripe-kids-tee", description: "A cheerful rainbow striped t-shirt. Machine washable and durable.", price: "14.99", categoryId: catMap["kids"], images: ["/images/product/46.jpg"], sizes: ["XS", "S", "M", "L"], color: "Multi", stock: 120, isFeatured: false, material: "Cotton Blend", rating: "4.6", reviewCount: 98, isNew: false },
    { name: "Space Explorer Kids Tee", slug: "space-explorer-kids-tee", description: "Space-themed with glow-in-the-dark print for extra fun!", price: "18.99", categoryId: catMap["kids"], images: ["/images/product/47.jpg", "/images/product/48.jpg"], sizes: ["XS", "S", "M", "L"], color: "Navy", stock: 75, isFeatured: false, material: "Cotton", rating: "4.9", reviewCount: 201, isNew: true },

    // Sports (4 products)
    { name: "Dri-Fit Training Tee", slug: "dri-fit-training-tee", description: "High-performance training t-shirt with moisture-wicking technology.", price: "34.99", categoryId: catMap["sports"], images: ["/images/product/49.jpg", "/images/product/50.jpg"], sizes: ["S", "M", "L", "XL", "XXL"], color: "Black", stock: 90, isFeatured: true, material: "Polyester Dri-Fit", rating: "4.7", reviewCount: 287, isNew: false },
    { name: "Compression Fit Gym Tee", slug: "compression-fit-gym-tee", description: "Body-hugging compression t-shirt with four-way stretch.", price: "36.99", categoryId: catMap["sports"], images: ["/images/product/70.jpg", "/images/product/71.jpg"], sizes: ["S", "M", "L", "XL"], color: "Gray", stock: 60, isFeatured: true, material: "Nylon Spandex", rating: "4.6", reviewCount: 165, isNew: false },
    { name: "Running Performance Tee", slug: "running-performance-tee", description: "Ultra-lightweight with reflective details and mesh ventilation.", price: "32.99", compareAtPrice: "39.99", categoryId: catMap["sports"], images: ["/images/product/72.jpg"], sizes: ["S", "M", "L", "XL"], color: "Neon Green", stock: 45, isFeatured: false, material: "Recycled Polyester", rating: "4.5", reviewCount: 112, isNew: true },
    { name: "Yoga Flow Tee", slug: "yoga-flow-tee", description: "Loose, flowy bamboo-fabric t-shirt designed for yoga. Naturally antibacterial.", price: "29.99", categoryId: catMap["sports"], images: ["/images/product/1.jpg", "/images/product/2.jpg"], sizes: ["XS", "S", "M", "L", "XL"], color: "Teal", stock: 55, isFeatured: false, material: "Bamboo Fabric", rating: "4.8", reviewCount: 143, isNew: false },

    // Premium (4 products)
    { name: "Pima Cotton Luxury Tee", slug: "pima-cotton-luxury-tee", description: "100% Peruvian Pima cotton. Exceptionally soft with a subtle lustre.", price: "49.99", categoryId: catMap["premium"], images: ["/images/product/3.jpg", "/images/product/4.jpg"], sizes: ["S", "M", "L", "XL"], color: "White", stock: 30, isFeatured: true, material: "Pima Cotton", rating: "4.9", reviewCount: 89, isNew: false },
    { name: "Japanese Cotton Tee", slug: "japanese-cotton-tee", description: "Premium Japanese cotton with impeccable construction.", price: "54.99", compareAtPrice: "64.99", categoryId: catMap["premium"], images: ["/images/product/5.jpg", "/images/product/6.jpg"], sizes: ["S", "M", "L", "XL"], color: "Black", stock: 25, isFeatured: true, material: "Japanese Cotton", rating: "4.9", reviewCount: 67, isNew: true },
    { name: "Cashmere Blend Tee", slug: "cashmere-blend-tee", description: "Ultra-luxurious cotton-cashmere blend for incredible softness.", price: "69.99", categoryId: catMap["premium"], images: ["/images/product/7.jpg"], sizes: ["S", "M", "L", "XL"], color: "Gray", stock: 15, isFeatured: true, material: "Cotton/Cashmere", rating: "5.0", reviewCount: 42, isNew: true },
    { name: "Silk-Touch Modal Tee", slug: "silk-touch-modal-tee", description: "Silky-smooth premium modal fabric with a luxurious hand feel.", price: "44.99", categoryId: catMap["premium"], images: ["/images/product/8.jpg", "/images/product/9.jpg"], sizes: ["XS", "S", "M", "L", "XL"], color: "Navy", stock: 35, isFeatured: false, material: "Modal", rating: "4.8", reviewCount: 76, isNew: false },
  ];

  await db.insert(schema.products).values(productData);
  console.log("✅ 36 T-Shirt products created");

  console.log("🎉 Seeding complete!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
