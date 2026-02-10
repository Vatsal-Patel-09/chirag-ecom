# T-Shirt E-Commerce Website

A modern, full-stack e-commerce website built with Next.js for selling t-shirts. This is a college project demonstrating a complete shopping experience with product browsing, cart management, and checkout functionality.

## Features

- 🛍️ Browse T-shirt products with images and details
- 🔍 View individual product pages
- 🛒 Add products to cart with size selection
- 📦 Shopping cart with quantity management
- 💳 Checkout process with customer information form
- ✅ Mock payment confirmation (no real payment integration)
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Package Manager:** pnpm

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- pnpm package manager

### Installation Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd chirag-ecom
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up your database**
   
   Open the `.env` file and replace the `DATABASE_URL` with your actual database connection string:
   
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   ```
   
   **Options for database:**
   - Local PostgreSQL: `postgresql://postgres:postgres@localhost:5432/chirag_ecom`
   - Railway: https://railway.app/
   - Supabase: https://supabase.com/
   - Neon: https://neon.tech/
   - PlanetScale: https://planetscale.com/

4. **Run database migrations**
   ```bash
   pnpm db:push
   ```
   
   Or if you prefer migrations:
   ```bash
   pnpm db:migrate
   ```

5. **Generate Prisma Client**
   ```bash
   pnpm db:generate
   ```

6. **Seed the database with sample products**
   ```bash
   pnpm db:seed
   ```

7. **Start the development server**
   ```bash
   pnpm dev
   ```

8. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm db:push` | Push schema changes to database |
| `pnpm db:migrate` | Create and run migrations |
| `pnpm db:seed` | Seed database with sample products |
| `pnpm db:studio` | Open Prisma Studio (database GUI) |
| `pnpm db:generate` | Generate Prisma Client |

## Database Schema

### Product
- id, name, description, price
- image, category, size[], color
- stock, createdAt, updatedAt

### Order
- id, customerName, email, phone
- address, totalAmount, status
- createdAt, updatedAt

### OrderItem
- id, orderId, productId
- quantity, price, size

## Project Structure

```
chirag-ecom/
├── app/
│   ├── api/
│   │   ├── products/         # Product API routes
│   │   └── orders/           # Order API routes
│   ├── components/
│   │   └── Navbar.tsx        # Navigation component
│   ├── store/
│   │   └── cart-store.ts     # Zustand cart state
│   ├── lib/
│   │   └── prisma.ts         # Prisma client instance
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx      # Product detail page
│   ├── cart/
│   │   └── page.tsx          # Shopping cart page
│   ├── checkout/
│   │   └── page.tsx          # Checkout page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seed script
├── .env                      # Environment variables
└── package.json              # Dependencies and scripts
```

## Usage Flow

1. **Browse Products** - View all available t-shirts on the homepage
2. **Select Product** - Click on a product to view details
3. **Choose Size** - Select your preferred size
4. **Add to Cart** - Add the product to your shopping cart
5. **View Cart** - Review your cart items and adjust quantities
6. **Checkout** - Enter shipping information
7. **Pay** - Click "Pay Now" to complete the order
8. **Success** - View payment success modal

## Database Management

### View Database with Prisma Studio
```bash
pnpm db:studio
```
This opens a visual interface at http://localhost:5555 where you can view and edit data.

### Reset Database
If you need to reset the database:
```bash
pnpm db:push --force-reset
pnpm db:seed
```

## Environment Variables

Create a `.env` file with the following:

```env
DATABASE_URL="your_database_connection_string_here"
```

## Notes

- This is a college project and uses mock payment (no real payment gateway integration)
- The payment success is simulated with a modal dialog
- Cart data is persisted in browser localStorage
- Images are served from Unsplash CDN

## Troubleshooting

### Database Connection Issues
- Verify your DATABASE_URL is correct
- Ensure PostgreSQL is running
- Check firewall/network settings

### Build Errors
- Run `pnpm db:generate` to regenerate Prisma Client
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`

### Image Loading Issues
- Images are loaded from Unsplash
- Ensure internet connection is active
- Check Next.js image configuration in `next.config.ts`

## License

This project is for educational purposes only.

## Author

Created as a college project for learning full-stack web development.
