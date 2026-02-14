const fs = require('fs');

const html = fs.readFileSync('./dummy.html', 'utf-8');

// Extract product cards using regex
const productRegex = /id="productlist-(\d+)-is">\s*<a href="([^"]+)">\s*<div[^>]*>.*?<img[^>]*data-url="([^"]+)"[^>]*>.*?<h5[^>]*class="[^"]*product-name-text[^"]*"[^>]*>([^<]+)<\/h5>.*?<span>([^<]+)<\/span><\/div>.*?₹\s*(\d+)<\/span>.*?<span class="product-price-strike">₹\s*(\d+)<\/span>/gs;

const products = [];
let match;

while ((match = productRegex.exec(html)) !== null) {
  products.push({
    id: match[1],
    slug: match[2].replace('/product/', '').replace('?get=1', ''),
    imageUrl: match[3],
    name: match[4].trim(),
    category: match[5].trim(),
    membershipPrice: parseInt(match[6]),
    originalPrice: parseInt(match[7]),
  });
}

console.log(`Found ${products.length} products\n`);

// Group by category
const categories = {};
products.forEach(p => {
  if (!categories[p.category]) categories[p.category] = [];
  categories[p.category].push(p);
});

console.log('Categories:');
Object.entries(categories).forEach(([cat, prods]) => {
  console.log(`  ${cat}: ${prods.length} products`);
});

fs.writeFileSync('./extracted-products.json', JSON.stringify({ categories, products }, null, 2));
console.log('\nSaved to extracted-products.json');
