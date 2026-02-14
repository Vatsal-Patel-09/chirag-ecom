const fs = require('fs');
const html = fs.readFileSync('dummy.html', 'utf-8');

// Match all product blocks
const productPattern = /id="productlist-(\d+)-is"><a href="([^"]+)">.*?data-url="([^"]+)".*?product-name-text"[^>]*>([^<]+)<\/h5>.*?listprice ecltext"><span>([^<]+)<\/span>.*?fsemibold">\u20b9\s*([\d,]+)<\/span>.*?product-price-strike">\u20b9\s*([\d,]+)<\/span>/gs;

const products = [];
let match;
while ((match = productPattern.exec(html)) !== null) {
  products.push({
    id: match[1],
    slug: match[2].replace('?get=1', ''),
    imageUrl: match[3],
    name: match[4].replace(/&amp;/g, '&'),
    category: match[5],
    membershipPrice: parseInt(match[6].replace(/,/g, '')),
    originalPrice: parseInt(match[7].replace(/,/g, ''))
  });
}

// Deduplicate by id
const seen = new Set();
const unique = products.filter(p => {
  if (seen.has(p.id)) return false;
  seen.add(p.id);
  return true;
});

// Group by category
const grouped = {};
unique.forEach(p => {
  if (!grouped[p.category]) grouped[p.category] = [];
  grouped[p.category].push(p);
});

const output = {
  totalProducts: unique.length,
  categories: Object.keys(grouped).length,
  productsByCategory: grouped
};

fs.writeFileSync('extracted_products.json', JSON.stringify(output, null, 2), 'utf-8');
console.log('Total unique products:', unique.length);
console.log('Categories:', Object.keys(grouped).join(', '));
console.log('File saved: extracted_products.json');
