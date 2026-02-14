import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { hash } from "bcryptjs";
import * as schema from "./schema";

// Load .env.local
config({ path: ".env.local" });

async function seed() {
  const sqlClient = neon(process.env.DATABASE_URL!);
  const db = drizzle(sqlClient, { schema });

  console.log("🌱 Seeding database...");

  // Clear existing data in correct order
  console.log("🗑️ Clearing existing data...");
  await db.delete(schema.orderItems);
  await db.delete(schema.orders);
  await db.delete(schema.cartItems);
  await db.delete(schema.wishlistItems);
  await db.delete(schema.products);
  await db.delete(schema.categories);
  await db.delete(schema.coupons);
  await db.delete(schema.addresses);
  await db.delete(schema.users);
  console.log("✅ Existing data cleared");

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

  // Create categories - consolidated from product data
  const categoryData = [
    {
      name: "T-Shirts",
      slug: "t-shirts",
      description: "Oversized, super oversized & full sleeve t-shirts with bold prints and licensed designs",
      imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759595763_7509683.jpg",
    },
    {
      name: "Shirts",
      slug: "shirts",
      description: "Cotton linen, textured, holiday, utility & relaxed fit shirts for every occasion",
      imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1730352766_5470975.jpg",
    },
    {
      name: "Polos",
      slug: "polos",
      description: "Classic polos, oversized polos & rugby polos in vibrant styles",
      imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1769236936_2776330.jpg",
    },
    {
      name: "Jeans & Pants",
      slug: "jeans-pants",
      description: "Cargo jeans, slim fit jeans, chino pants & cotton linen pants",
      imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572936_8366141.jpg",
    },
    {
      name: "Jackets & Outerwear",
      slug: "jackets-outerwear",
      description: "Bomber jackets, shackets, flannel shackets & oversized hoodies",
      imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753098937_4780598.jpg",
    },
    {
      name: "Sneakers",
      slug: "sneakers",
      description: "High top & low top sneakers for urban style",
      imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770964536_9754011.jpg",
    },
  ];

  const insertedCategories = await db
    .insert(schema.categories)
    .values(categoryData)
    .returning();
  console.log("✅ Categories created");

  const catMap: Record<string, string> = {};
  insertedCategories.forEach((c) => {
    catMap[c.slug] = c.id;
  });

  // Map original sub-categories to consolidated categories
  const categoryMapping: Record<string, string> = {
    "Oversized T-Shirts": "t-shirts",
    "Super Oversized T-Shirts": "t-shirts",
    "Oversized Full Sleeve T-Shirts": "t-shirts",
    "Cotton Linen Shirts": "shirts",
    "Men Textured Shirts": "shirts",
    "Holiday Shirts": "shirts",
    "Men Utility Shirts": "shirts",
    "Men Relaxed Shirts": "shirts",
    "Oversized Shirts": "shirts",
    "Denim Shirts": "shirts",
    "Shirts": "shirts",
    "Men Rugby Polos": "polos",
    "Oversized Polos": "polos",
    "Polos": "polos",
    "Cotton Linen Pants": "jeans-pants",
    "Men Cargo Jeans": "jeans-pants",
    "Men Jeans": "jeans-pants",
    "Chino Pants": "jeans-pants",
    "Men Flannel Shackets": "jackets-outerwear",
    "Bomber Jackets": "jackets-outerwear",
    "Men Shackets": "jackets-outerwear",
    "Men Oversized Hoodies": "jackets-outerwear",
    "Men High Top Sneakers": "sneakers",
    "Men Low Top Sneakers": "sneakers",
  };

  // Create coupons
  await db.insert(schema.coupons).values([
    { code: "SAVE10", discount: 10 },
    { code: "FIRSTORDER", discount: 15 },
    { code: "WELCOME20", discount: 20 },
    { code: "MEGA50", discount: 50 },
  ]);
  console.log("✅ Coupons created");

  // All products extracted from TheSouledStore
  const allProducts = [
    // ===== Cotton Linen Shirts (13) =====
    { name: "Cotton Linen: Deep Blue", slug: "solids-blue-men-cotton-linen-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1730352766_5470975.jpg", category: "Cotton Linen Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Cotton Linen Utility: Rosewood", slug: "men-linen-shirts-rose-garden", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753184953_8196988.jpg", category: "Cotton Linen Shirts", membershipPrice: 1499, originalPrice: 1599 },
    { name: "Cotton Linen: Grey Brown", slug: "solids-brown-men-cotton-linen-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1747120022_5432359.jpg", category: "Cotton Linen Shirts", membershipPrice: 1199, originalPrice: 1299 },
    { name: "Cotton Linen: Coral Peach", slug: "solids-orange-men-cotton-linen-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712574694_1119733.jpg", category: "Cotton Linen Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Cotton Linen: Soft Pink", slug: "solids-soft-pink-men-shirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1739878029_1383597.jpg", category: "Cotton Linen Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Cotton Linen: Russet Brown", slug: "solids-rusty-red-men-shirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1738154347_6930152.jpg", category: "Cotton Linen Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Cotton Linen: Striped Sienna", slug: "tss-originals-cannoli-cream-men-linen-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1738067130_6501375.jpg", category: "Cotton Linen Shirts", membershipPrice: 1599, originalPrice: 1699 },
    { name: "Cotton Linen: Sky Blue", slug: "solids-sky-blue-cotton-linen-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1716543492_6546785.jpg", category: "Cotton Linen Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Cotton Linen Stripes: Azure", slug: "cotton-linen-shirts-blue-steel-men", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1738743277_4539550.jpg", category: "Cotton Linen Shirts", membershipPrice: 1499, originalPrice: 1599 },
    { name: "Cotton Linen: Twilight", slug: "solids-dark-indigo-men-cotton-linen-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1730283592_2313955.jpg", category: "Cotton Linen Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Cotton Linen Stripes: Nautical", slug: "cotton-linen-shirt-shadow-stripes", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1742034685_4861836.jpg", category: "Cotton Linen Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Cotton Linen: Ivory Blush", slug: "solids-light-pink-men-cotton-linen-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1730283547_5629543.jpg", category: "Cotton Linen Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Cotton Linen: Sage", slug: "solids-olive-men-cotton-linen-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712574639_7802765.jpg", category: "Cotton Linen Shirts", membershipPrice: 1399, originalPrice: 1499 },

    // ===== Cotton Linen Pants (1) =====
    { name: "Cotton Linen Pants: Ecru", slug: "cotton-linen-pants-ecru-men", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572936_8366141.jpg", category: "Cotton Linen Pants", membershipPrice: 1699, originalPrice: 1799 },

    // ===== Men Rugby Polos (1) =====
    { name: "Stranger Things: Hawkins High", slug: "stranger-things-hawkins-men-oversized-polo", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1769236936_2776330.jpg", category: "Men Rugby Polos", membershipPrice: 1399, originalPrice: 1499 },

    // ===== Men Textured Shirts (7) =====
    { name: "Textured Shirt: Mulberry", slug: "textured-mulberry-knit-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754715290_9593419.jpg", category: "Men Textured Shirts", membershipPrice: 1499, originalPrice: 1599 },
    { name: "Textured Shirt: Midnight Blue", slug: "textured-midnight-blue-knit-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754715332_2553974.jpg", category: "Men Textured Shirts", membershipPrice: 1499, originalPrice: 1599 },
    { name: "Textured Shirt: Charcoal", slug: "textured-charcoal-knit-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754715246_2685908.jpg", category: "Men Textured Shirts", membershipPrice: 1499, originalPrice: 1599 },
    { name: "Textured Shirt: Olive", slug: "textured-olive-knit-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754715409_3771755.jpg", category: "Men Textured Shirts", membershipPrice: 1499, originalPrice: 1599 },
    { name: "Textured Shirt: Walnut", slug: "textured-walnut-knit-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754715384_6479618.jpg", category: "Men Textured Shirts", membershipPrice: 1499, originalPrice: 1599 },
    { name: "Textured Shirt: Dusty Rose", slug: "textured-dusty-rose-knit-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754715268_3428506.jpg", category: "Men Textured Shirts", membershipPrice: 1499, originalPrice: 1599 },
    { name: "Textured Shirt: Cream", slug: "textured-cream-knit-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1755330048_3605744.jpg", category: "Men Textured Shirts", membershipPrice: 1499, originalPrice: 1599 },

    // ===== Men High Top Sneakers (1) =====
    { name: "UBZ Convertible: Luminous", slug: "ubz-convertible-glow-in-dark-men-high-top-sneakers", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770964536_9754011.jpg", category: "Men High Top Sneakers", membershipPrice: 3299, originalPrice: 3499 },

    // ===== Oversized T-Shirts (34) =====
    { name: "Stranger Things: Upside Down", slug: "stranger-things-upside-down-spray-men-oversized-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759595763_7509683.jpg", category: "Oversized T-Shirts", membershipPrice: 849, originalPrice: 899 },
    { name: "FCB: Numero 10", slug: "oversized-t-shirts-fcb-match-day", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1750426444_9028342.jpg", category: "Oversized T-Shirts", membershipPrice: 1499, originalPrice: 1599 },
    { name: "TSS Originals: Trident", slug: "tss-originals-trident-oversized-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1756476946_4773055.jpg", category: "Oversized T-Shirts", membershipPrice: 1299, originalPrice: 1399 },
    { name: "Linkin Park: Breaking The Habit", slug: "linkin-park-the-band-men-oversized-t-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1768923573_5775909.jpg", category: "Oversized T-Shirts", membershipPrice: 1199, originalPrice: 1299 },
    { name: "Minions: Blah Blah Blah", slug: "minions-blah-oversized-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727678292_9404417.jpg", category: "Oversized T-Shirts", membershipPrice: 849, originalPrice: 899 },
    { name: "Batman: Classic Logo", slug: "men-oversized-t-shirts-batman-classic-logo", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754380967_1447905.jpg", category: "Oversized T-Shirts", membershipPrice: 999, originalPrice: 1099 },
    { name: "Solids: Olive", slug: "solids-olive-men-oversized-t-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1725603614_2139506.jpg", category: "Oversized T-Shirts", membershipPrice: 799, originalPrice: 849 },
    { name: "Gojo: After Dark", slug: "jujutsu-kaisen-gojo-after-dark-men-oversized-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1763961989_3714652.jpg", category: "Oversized T-Shirts", membershipPrice: 849, originalPrice: 899 },
    { name: "One Piece: Zoro", slug: "one-piece-zoro-hell-memories-men-oversized-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1769075525_4458523.jpg", category: "Oversized T-Shirts", membershipPrice: 849, originalPrice: 899 },
    { name: "Solids: Black", slug: "solids-black-men-oversized-t-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1725603589_5771764.jpg", category: "Oversized T-Shirts", membershipPrice: 799, originalPrice: 849 },
    { name: "Batman: The Hero Glow", slug: "batman-the-hero-glow-men-oversized-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1771067690_9165491.gif", category: "Oversized T-Shirts", membershipPrice: 1199, originalPrice: 1299 },
    { name: "Black Panther: Panther Power", slug: "black-panther-power-oversized-tshirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759730351_1337432.jpg", category: "Oversized T-Shirts", membershipPrice: 949, originalPrice: 1049 },
    { name: "Kung Fu Panda: Master", slug: "oversized-t-shirts-kung-fu-panda-master", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1747486084_3696029.jpg", category: "Oversized T-Shirts", membershipPrice: 949, originalPrice: 1049 },
    { name: "Peacemaker: Peace Out", slug: "dc-peace-out-men-oversized-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1761820245_5596970.jpg", category: "Oversized T-Shirts", membershipPrice: 799, originalPrice: 849 },
    { name: "Spider-Man: Oscorp Suit", slug: "oversized-t-shirts-spider-man-oscorp-suit", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1751116998_8805341.jpg", category: "Oversized T-Shirts", membershipPrice: 1299, originalPrice: 1399 },
    { name: "Linkin Park: Breaking The Habit", slug: "linkin-park-breaking-the-habit-men-oversized-t-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1771072734_8540545.jpg", category: "Oversized T-Shirts", membershipPrice: 899, originalPrice: 999 },
    { name: "TSS Originals: Classic Grey", slug: "tss-originals-classic-grey-men-oversized-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1762693135_4729775.jpg", category: "Oversized T-Shirts", membershipPrice: 899, originalPrice: 999 },
    { name: "Naruto Shippuden: Hokage Dream", slug: "naruto-hokage-men-oversized-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1737789999_1303600.jpg", category: "Oversized T-Shirts", membershipPrice: 899, originalPrice: 999 },
    { name: "Harry Potter: Marauder's Map (Solar)", slug: "harry-potter-the-map-oversized-tshirt-mens", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1761981512_3153309.gif", category: "Oversized T-Shirts", membershipPrice: 1499, originalPrice: 1599 },
    { name: "Linkin Park: Hybrid Theory", slug: "linkin-park-classic-men-oversized-t-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770893225_8898680.jpg", category: "Oversized T-Shirts", membershipPrice: 1199, originalPrice: 1299 },
    { name: "Looney Tunes: Magic Mushroom", slug: "looney-tunes-magic-mushroom-oversized-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1711090682_4204095.jpg", category: "Oversized T-Shirts", membershipPrice: 849, originalPrice: 899 },
    { name: "TSS Originals: Seven Chakras", slug: "tss-originals-seven-chakras-oversized-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1763982276_7610627.jpg", category: "Oversized T-Shirts", membershipPrice: 1699, originalPrice: 1799 },
    { name: "Popcorn Texture: Caviar", slug: "oversized-tshirt-blackout-men", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1758695753_8265055.jpg", category: "Oversized T-Shirts", membershipPrice: 749, originalPrice: 799 },
    { name: "Harry Potter: Sorted", slug: "oversized-tshirt-harry-potter-sorted-men", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1751718597_6137634.jpg", category: "Oversized T-Shirts", membershipPrice: 1099, originalPrice: 1199 },
    { name: "S.W.SMILEY: Winkle", slug: "men-oversized-t-shirts-smiley-winkle", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754734387_3008122.jpg", category: "Oversized T-Shirts", membershipPrice: 899, originalPrice: 999 },
    { name: "Tom & Jerry: Chill Jerry", slug: "tom-and-jerry-chill-jerry-oversized-t-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1751116109_5395197.jpg", category: "Oversized T-Shirts", membershipPrice: 849, originalPrice: 999 },
    { name: "Flashback Fits: A 90's Kid", slug: "flashback-fits-a-90s-kid-men-oversized-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1769098332_8545649.jpg", category: "Oversized T-Shirts", membershipPrice: 749, originalPrice: 799 },
    { name: "TSS Originals: Indie Elephant", slug: "oversized-t-shirt-indie-elephant-men", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1769593687_7127628.jpg", category: "Oversized T-Shirts", membershipPrice: 899, originalPrice: 999 },
    { name: "Ottoman: Garfield Not My Problem", slug: "garfield-nope-men-oversized-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1756964396_9649819.jpg", category: "Oversized T-Shirts", membershipPrice: 1099, originalPrice: 1199 },
    { name: "Batman: Logo (Reflective)", slug: "batman-logo-men-oversized-half-sleeve-t-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754297985_8592598.jpg", category: "Oversized T-Shirts", membershipPrice: 1099, originalPrice: 1199 },
    { name: "Kung Fu Panda: Master Of Chi", slug: "kung-fu-panda-master-of-chi-oversized-tshirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1763190255_5396429.jpg", category: "Oversized T-Shirts", membershipPrice: 849, originalPrice: 899 },

    // ===== Men Low Top Sneakers (7) =====
    { name: "Milano: Walnut", slug: "van-guard-beige-men-low-top-sneakers", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770467378_3371828.jpg", category: "Men Low Top Sneakers", membershipPrice: 2399, originalPrice: 2499 },
    { name: "Milano: Shadow Grey", slug: "van-guard-grey-men-low-top-sneakers", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770467415_5629748.jpg", category: "Men Low Top Sneakers", membershipPrice: 2399, originalPrice: 2499 },
    { name: "Vanguard: Classic White", slug: "vanguard-classic-white-men-low-top-sneakers", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770467450_7163839.jpg", category: "Men Low Top Sneakers", membershipPrice: 2399, originalPrice: 2499 },
    { name: "Milano: Olive", slug: "milano-olive-men-low-top-sneakers", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770467487_1342757.jpg", category: "Men Low Top Sneakers", membershipPrice: 2399, originalPrice: 2499 },
    { name: "Vanguard: Navy", slug: "vanguard-navy-men-low-top-sneakers", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770467520_2887531.jpg", category: "Men Low Top Sneakers", membershipPrice: 2399, originalPrice: 2499 },
    { name: "Milano: Black", slug: "milano-black-men-low-top-sneakers", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770467558_1452387.jpg", category: "Men Low Top Sneakers", membershipPrice: 2399, originalPrice: 2499 },
    { name: "Vanguard: Burgundy", slug: "vanguard-burgundy-men-low-top-sneakers", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770467593_8429156.jpg", category: "Men Low Top Sneakers", membershipPrice: 2399, originalPrice: 2499 },

    // ===== Super Oversized T-Shirts (5) =====
    { name: "Nomad: Phoenix", slug: "super-oversized-t-shirts-nomad-phoenix", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1769075509_6135520.jpg", category: "Super Oversized T-Shirts", membershipPrice: 1899, originalPrice: 1999 },
    { name: "TSS Originals: Kurukshetra", slug: "tss-originals-kurukshetra-super-oversized-t-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1743657072_4845052.jpg", category: "Super Oversized T-Shirts", membershipPrice: 1699, originalPrice: 1799 },
    { name: "Nomad: Compass", slug: "nomad-compass-oversized-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1742976621_3048761.jpg", category: "Super Oversized T-Shirts", membershipPrice: 2199, originalPrice: 2299 },
    { name: "TSS Originals: Kaal Chakra", slug: "men-super-oversized-t-shirt-kaal-chakra", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1756525677_3953968.jpg", category: "Super Oversized T-Shirts", membershipPrice: 1599, originalPrice: 1699 },
    { name: "Harry Potter: The Silent Vow", slug: "harry-potter-the-silent-vow-super-oversized-t-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1755880153_8401247.jpg", category: "Super Oversized T-Shirts", membershipPrice: 1199, originalPrice: 1649 },

    // ===== Oversized Polos (4) =====
    { name: "Solids: Forest Green Polo", slug: "solids-forest-green-oversized-polo", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572888_7254638.jpg", category: "Oversized Polos", membershipPrice: 999, originalPrice: 1099 },
    { name: "Solids: Ivory Cream Polo", slug: "solids-ivory-cream-oversized-polo", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572860_3698125.jpg", category: "Oversized Polos", membershipPrice: 999, originalPrice: 1099 },
    { name: "Solids: Stone Blue Polo", slug: "solids-stone-blue-oversized-polo", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572830_4127693.jpg", category: "Oversized Polos", membershipPrice: 999, originalPrice: 1099 },
    { name: "Solids: Dusty Mauve Polo", slug: "solids-dusty-mauve-oversized-polo", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572798_2395748.jpg", category: "Oversized Polos", membershipPrice: 999, originalPrice: 1099 },

    // ===== Polos (4) =====
    { name: "Classic Polo: Pine Green", slug: "solids-pine-green-men-polo", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572768_5982634.jpg", category: "Polos", membershipPrice: 899, originalPrice: 999 },
    { name: "Classic Polo: Slate Grey", slug: "solids-slate-grey-men-polo", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572736_8461527.jpg", category: "Polos", membershipPrice: 899, originalPrice: 999 },
    { name: "Classic Polo: Navy", slug: "solids-navy-men-polo", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572704_6139274.jpg", category: "Polos", membershipPrice: 899, originalPrice: 999 },
    { name: "Classic Polo: White", slug: "solids-white-men-polo", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572672_4827395.jpg", category: "Polos", membershipPrice: 899, originalPrice: 999 },

    // ===== Oversized Shirts (2) =====
    { name: "Oversized Shirt: Ivory Linen", slug: "oversized-shirt-ivory-linen", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754715430_8529140.jpg", category: "Oversized Shirts", membershipPrice: 1599, originalPrice: 1699 },
    { name: "Oversized Shirt: Dusty Blue", slug: "oversized-shirt-dusty-blue", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754715460_3675981.jpg", category: "Oversized Shirts", membershipPrice: 1599, originalPrice: 1699 },

    // ===== Holiday Shirts (8) =====
    { name: "Holiday Print: Tropical Vibes", slug: "holiday-shirt-tropical-vibes", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753098937_4780598.jpg", category: "Holiday Shirts", membershipPrice: 1299, originalPrice: 1399 },
    { name: "Holiday Print: Paradise Palms", slug: "holiday-shirt-paradise-palms", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753098963_2614837.jpg", category: "Holiday Shirts", membershipPrice: 1299, originalPrice: 1399 },
    { name: "Holiday Print: Ocean Breeze", slug: "holiday-shirt-ocean-breeze", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753098990_5897241.jpg", category: "Holiday Shirts", membershipPrice: 1299, originalPrice: 1399 },
    { name: "Holiday Print: Sunset Flora", slug: "holiday-shirt-sunset-flora", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753099017_8253649.jpg", category: "Holiday Shirts", membershipPrice: 1299, originalPrice: 1399 },
    { name: "Holiday Print: Island Waves", slug: "holiday-shirt-island-waves", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753099043_1748362.jpg", category: "Holiday Shirts", membershipPrice: 1299, originalPrice: 1399 },
    { name: "Holiday Print: Retro Beach", slug: "holiday-shirt-retro-beach", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753099070_4192573.jpg", category: "Holiday Shirts", membershipPrice: 1299, originalPrice: 1399 },
    { name: "Holiday Print: Coastal Scenic", slug: "holiday-shirt-coastal-scenic", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753099097_7628451.jpg", category: "Holiday Shirts", membershipPrice: 1299, originalPrice: 1399 },
    { name: "Holiday Print: Garden Party", slug: "holiday-shirt-garden-party", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753099123_3957184.jpg", category: "Holiday Shirts", membershipPrice: 1299, originalPrice: 1399 },

    // ===== Men Utility Shirts (2) =====
    { name: "Solids: Off White", slug: "solids-off-white-utility-shirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1709982174_6944472.jpg", category: "Men Utility Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Plaid: Greyscale", slug: "plaid-greyscale-utility-shirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1764660274_2193914.jpg", category: "Men Utility Shirts", membershipPrice: 1399, originalPrice: 1499 },

    // ===== Oversized Full Sleeve T-Shirts (6) =====
    { name: "TSS Originals: True Navy", slug: "tss-originals-true-navy-oversized-full-sleeve-t-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1726315197_8300692.jpg", category: "Oversized Full Sleeve T-Shirts", membershipPrice: 1199, originalPrice: 1299 },
    { name: "Naruto Shippuden: Konoha Leaf", slug: "naruto-symbol-of-konoha-men-oversized-full-sleeve-t-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1738129944_9654264.jpg", category: "Oversized Full Sleeve T-Shirts", membershipPrice: 1199, originalPrice: 1299 },
    { name: "TSS Originals: Level Up", slug: "tss-originals-level-up-men-oversized-full-sleeve-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1771059607_4321450.jpg", category: "Oversized Full Sleeve T-Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Batman: Dark Knight", slug: "batman-dark-knight-men-oversized-full-sleeve-t-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1771057818_8126878.jpg", category: "Oversized Full Sleeve T-Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Ombre: Midnight Blue", slug: "ombre-midnight-blue-oversized-full-sleeve-tshirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712640237_9675569.jpg", category: "Oversized Full Sleeve T-Shirts", membershipPrice: 1099, originalPrice: 1199 },
    { name: "Doctor Sleeve: Campus Classic", slug: "oversized-full-sleeves-tshirts-tss-originals-glow", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1745857137_4330212.jpg", category: "Oversized Full Sleeve T-Shirts", membershipPrice: 1299, originalPrice: 1399 },

    // ===== Men Flannel Shackets (1) =====
    { name: "Flannel Shacket: Charcoal Plaid", slug: "flannel-shacket-charcoal-plaid", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753098870_6281935.jpg", category: "Men Flannel Shackets", membershipPrice: 1999, originalPrice: 2199 },

    // ===== Men Relaxed Shirts (6) =====
    { name: "Relaxed Fit: Sage Linen", slug: "relaxed-fit-sage-linen-shirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753184900_3952741.jpg", category: "Men Relaxed Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Relaxed Fit: Sky Blue", slug: "relaxed-fit-sky-blue-shirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753184927_7418623.jpg", category: "Men Relaxed Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Relaxed Fit: Dusty Pink", slug: "relaxed-fit-dusty-pink-shirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753184980_4725938.jpg", category: "Men Relaxed Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Relaxed Fit: Charcoal", slug: "relaxed-fit-charcoal-shirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753185007_8162534.jpg", category: "Men Relaxed Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Relaxed Fit: Cream", slug: "relaxed-fit-cream-shirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753185034_2587416.jpg", category: "Men Relaxed Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Relaxed Fit: Olive", slug: "relaxed-fit-olive-shirt", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753185061_6934825.jpg", category: "Men Relaxed Shirts", membershipPrice: 1399, originalPrice: 1499 },

    // ===== Bomber Jackets (1) =====
    { name: "Superman: Man Of Steel", slug: "superman-man-of-steel-men-bomber-jacket", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1771071390_6851777.jpg", category: "Bomber Jackets", membershipPrice: 3299, originalPrice: 3499 },

    // ===== Men Cargo Jeans (3) =====
    { name: "Solids: Light Beige (Straight Fit)", slug: "solids-light-beige-straight-fit-men-pants", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1758178603_9631039.jpg", category: "Men Cargo Jeans", membershipPrice: 2399, originalPrice: 2499 },
    { name: "Straight-Fit Denim: Slate Grey", slug: "straight-fit-denim-slate-grey-men-cargo-jeans", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770461018_2275105.jpg", category: "Men Cargo Jeans", membershipPrice: 2199, originalPrice: 2299 },
    { name: "Men's Cargo Jeans: White", slug: "mens-cargo-jeans-white", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1763365375_3391871.jpg", category: "Men Cargo Jeans", membershipPrice: 2499, originalPrice: 2599 },

    // ===== Men Jeans (4) =====
    { name: "Straight-Fit Denim: Drift Away", slug: "baggy-fit-denim-drift-away-mens-jeans", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1771060745_9920992.jpg", category: "Men Jeans", membershipPrice: 2399, originalPrice: 2499 },
    { name: "Denim: Ivory", slug: "denim-snow-white-slim-fit-men-jeans", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759747356_8212803.jpg", category: "Men Jeans", membershipPrice: 1899, originalPrice: 1999 },
    { name: "Solids: Mid Blue Wash (Straight Fit)", slug: "solids-mid-blue-wash-men-jeans", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1683989689_2997060.jpg", category: "Men Jeans", membershipPrice: 1899, originalPrice: 1999 },
    { name: "Denim: Light Blue (Straight Fit)", slug: "denim-light-blue-straight-fit", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757075743_1039624.jpg", category: "Men Jeans", membershipPrice: 1949, originalPrice: 2049 },

    // ===== Denim Shirts (1) =====
    { name: "Classic Denim Shirt: Blue", slug: "classic-denim-shirt-blue-men-relaxed-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1724478566_4473996.jpg", category: "Denim Shirts", membershipPrice: 1849, originalPrice: 1949 },

    // ===== Shirts (2) =====
    { name: "Oxford Stripes: Pink Mirage", slug: "men-slim-fit-shirt-lilac-stripes", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1766486553_5722690.jpg", category: "Shirts", membershipPrice: 1399, originalPrice: 1499 },
    { name: "Plaid: Blue And White", slug: "plaid-blue-and-white-men-utility-shirts", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1739791588_8675755.jpg", category: "Shirts", membershipPrice: 1399, originalPrice: 1499 },

    // ===== Men Shackets (1) =====
    { name: "Colourblock Shacket: Olive", slug: "oversized-shacket-green-screen-men", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1768972909_1970746.jpg", category: "Men Shackets", membershipPrice: 1499, originalPrice: 1599 },

    // ===== Men Oversized Hoodies (1) =====
    { name: "Batman: Dark Knight", slug: "batman-dark-knight-men-oversized-hoodie", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1764327058_5045006.jpg", category: "Men Oversized Hoodies", membershipPrice: 2499, originalPrice: 2599 },

    // ===== Chino Pants (5) =====
    { name: "Chino Pants: Khaki", slug: "chino-pants-khaki", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572416_9374521.jpg", category: "Chino Pants", membershipPrice: 1499, originalPrice: 1599 },
    { name: "Chino Pants: Navy", slug: "chino-pants-navy", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572384_5198374.jpg", category: "Chino Pants", membershipPrice: 1499, originalPrice: 1599 },
    { name: "Chino Pants: Olive", slug: "chino-pants-olive", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572352_8461253.jpg", category: "Chino Pants", membershipPrice: 1499, originalPrice: 1599 },
    { name: "Chino Pants: Charcoal", slug: "chino-pants-charcoal", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572320_2759381.jpg", category: "Chino Pants", membershipPrice: 1499, originalPrice: 1599 },
    { name: "Chino Pants: Beige", slug: "chino-pants-beige", imageUrl: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1757572288_6142758.jpg", category: "Chino Pants", membershipPrice: 1499, originalPrice: 1599 },
  ];

  // Color extraction helper
  function extractColor(name: string): string {
    const colorMap: Record<string, string> = {
      blue: "Blue", navy: "Navy", black: "Black", white: "White", grey: "Grey",
      gray: "Grey", olive: "Olive", green: "Green", red: "Red", brown: "Brown",
      pink: "Pink", cream: "Cream", charcoal: "Charcoal", maroon: "Maroon",
      burgundy: "Burgundy", indigo: "Indigo", coral: "Coral", sage: "Sage",
      ivory: "Ivory", khaki: "Khaki", beige: "Beige", teal: "Teal",
      walnut: "Brown", midnight: "Navy", rose: "Pink", mauve: "Purple",
    };
    const lower = name.toLowerCase();
    for (const [key, value] of Object.entries(colorMap)) {
      if (lower.includes(key)) return value;
    }
    return "Multi";
  }

  // Material based on sub-category
  function getMaterial(category: string): string {
    const materials: Record<string, string> = {
      "Cotton Linen Shirts": "Cotton Linen Blend",
      "Cotton Linen Pants": "Cotton Linen Blend",
      "Men Rugby Polos": "Cotton Pique",
      "Men Textured Shirts": "Textured Knit Cotton",
      "Men High Top Sneakers": "Canvas & Rubber",
      "Oversized T-Shirts": "100% Cotton, 240 GSM",
      "Men Low Top Sneakers": "Premium Leather",
      "Super Oversized T-Shirts": "100% Cotton, 280 GSM",
      "Oversized Polos": "Cotton Pique",
      "Polos": "Cotton Pique",
      "Oversized Shirts": "Cotton Linen",
      "Holiday Shirts": "Viscose Rayon",
      "Men Utility Shirts": "Cotton Canvas",
      "Oversized Full Sleeve T-Shirts": "100% Cotton, 240 GSM",
      "Men Flannel Shackets": "Brushed Cotton Flannel",
      "Men Relaxed Shirts": "Cotton Linen",
      "Bomber Jackets": "Nylon Shell, Polyester Lining",
      "Men Cargo Jeans": "Cotton Denim Stretch",
      "Men Jeans": "Cotton Denim Stretch",
      "Denim Shirts": "Cotton Denim",
      "Shirts": "Oxford Cotton",
      "Men Shackets": "Cotton Twill",
      "Men Oversized Hoodies": "Cotton Fleece, 350 GSM",
      "Chino Pants": "Cotton Twill",
    };
    return materials[category] || "100% Cotton";
  }

  // Sizes based on sub-category
  function getSizes(category: string): string[] {
    if (category.includes("Sneakers")) return ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];
    if (category.includes("Jeans") || category.includes("Pants") || category.includes("Chino")) return ["28", "30", "32", "34", "36", "38"];
    return ["S", "M", "L", "XL", "XXL"];
  }

  // Description generator
  function getDescription(name: string, category: string): string {
    const catDescs: Record<string, string> = {
      "Oversized T-Shirts": `${name} - Premium oversized t-shirt with a relaxed drop-shoulder fit. Made from 100% cotton with 240 GSM fabric weight for a structured drape. Features ribbed crew neck and side-seam construction.`,
      "Super Oversized T-Shirts": `${name} - Super oversized t-shirt with an extra-relaxed silhouette. Heavy 280 GSM cotton for premium weight and feel. Features dropped shoulders, extended length, and a boxy fit.`,
      "Oversized Full Sleeve T-Shirts": `${name} - Oversized full-sleeve t-shirt combining comfort with street-ready style. 240 GSM cotton with ribbed cuffs and crew neck. Relaxed fit for effortless layering.`,
      "Cotton Linen Shirts": `${name} - Breathable cotton-linen blend shirt for warm weather. Features a relaxed regular fit, spread collar, and full button placket with natural texture.`,
      "Men Textured Shirts": `${name} - Textured knit shirt with a refined self-pattern fabric. Classic collar and comfortable regular fit for versatile styling.`,
      "Holiday Shirts": `${name} - Vibrant holiday-print shirt in smooth viscose rayon. Camp collar, relaxed fit, and all-over tropical print for casual weekends.`,
      "Men Relaxed Shirts": `${name} - Relaxed-fit shirt in premium cotton-linen. Spread collar, single chest pocket, and curved hem for casual and semi-formal occasions.`,
      "Oversized Shirts": `${name} - Oversized shirt with a contemporary loose fit. Cotton-linen fabric with spread collar and full button closure.`,
      "Denim Shirts": `${name} - Classic denim shirt in premium cotton. Button-down collar, dual chest pockets, and adjustable cuffs.`,
      "Shirts": `${name} - Crisp oxford cotton shirt with a tailored fit. Button-down collar, single chest pocket, and adjustable barrel cuffs.`,
      "Men Utility Shirts": `${name} - Utility-inspired shirt with functional pockets and structured cotton canvas. Spread collar and relaxed military-inspired fit.`,
      "Polos": `${name} - Classic polo in premium cotton pique. Ribbed collar, two-button placket, and side vents for a clean silhouette.`,
      "Oversized Polos": `${name} - Oversized polo with relaxed modern fit. Premium cotton pique with ribbed collar and dropped shoulders.`,
      "Men Rugby Polos": `${name} - Rugged rugby-style polo with contrasting collar and heavyweight cotton pique. Rubber button placket and reinforced shoulders.`,
      "Men Jeans": `${name} - Slim-fit jeans in premium cotton denim with 2% stretch. Classic five-pocket design with tapered leg and washed finish.`,
      "Men Cargo Jeans": `${name} - Cargo-style jeans with functional side pockets and relaxed tapered fit. Premium cotton denim stretch for durability.`,
      "Cotton Linen Pants": `${name} - Lightweight cotton-linen pants with elasticated drawstring waist. Relaxed tapered fit, breathable and comfortable.`,
      "Chino Pants": `${name} - Classic chino pants in premium cotton twill. Flat front, slant pockets, and slim tapered fit with stretch comfort.`,
      "Bomber Jackets": `${name} - Classic bomber jacket with ribbed cuffs, collar, and hem. Nylon shell with polyester lining and front zip closure.`,
      "Men Flannel Shackets": `${name} - Heavyweight flannel shacket in classic plaid. Brushed cotton for warmth with button closure and chest pockets.`,
      "Men Shackets": `${name} - Versatile shacket in durable cotton twill. Functions as shirt and jacket with button closure and oversized fit.`,
      "Men Oversized Hoodies": `${name} - Oversized hoodie in heavy 350 GSM cotton fleece. Kangaroo pocket, drawstring hood, ribbed cuffs and hem.`,
      "Men High Top Sneakers": `${name} - Premium high-top sneakers with convertible design. Canvas upper, rubber sole, padded collar with glow-in-dark detail.`,
      "Men Low Top Sneakers": `${name} - Sleek low-top sneakers in premium leather with minimalist design. Cushioned insole and durable rubber outsole.`,
    };
    return catDescs[category] || `${name} - Premium quality product crafted with attention to detail and comfort.`;
  }

  // Build product data for DB insertion
  const productData = allProducts.map((p, index) => {
    const catSlug = categoryMapping[p.category] || "t-shirts";
    const isFeatured = index % 5 === 0;
    const isNew = index % 7 === 0;

    return {
      name: p.name,
      slug: p.slug,
      description: getDescription(p.name, p.category),
      price: String(p.membershipPrice),
      compareAtPrice: String(p.originalPrice),
      categoryId: catMap[catSlug],
      images: [p.imageUrl],
      sizes: getSizes(p.category),
      color: extractColor(p.name),
      stock: Math.floor(Math.random() * 150) + 20,
      isFeatured,
      material: getMaterial(p.category),
      rating: String((4.0 + Math.random() * 1.0).toFixed(1)),
      reviewCount: Math.floor(Math.random() * 300) + 20,
      isNew,
    };
  });

  // Insert in batches of 20
  const batchSize = 20;
  for (let i = 0; i < productData.length; i += batchSize) {
    const batch = productData.slice(i, i + batchSize);
    await db.insert(schema.products).values(batch);
    console.log(`✅ Products batch ${Math.floor(i / batchSize) + 1} created (${batch.length} products)`);
  }

  console.log(`\n🎉 Seeding complete! ${productData.length} products across ${categoryData.length} categories.`);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
