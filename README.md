# GreenCraft - Eco-Friendly Marketplace

A marketplace for handmade and eco-friendly products built with the MERN stack.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios, Lucide React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs
- **Authentication**: JWT (JSON Web Tokens)

## Features

### Phase 1 (Current)
- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Home Page with Featured Products
- ✅ Responsive Navbar & Footer
- ✅ Product Categories
- ✅ Product Listing with Search & Filters
- ✅ Product Details Page
- ✅ Eco Badge System (Handmade, Organic, Recycled, etc.)
- ✅ Seller Information Display

### Future Phases (Not Implemented)
- Seller Registration & Dashboard
- Admin Panel
- Image Uploads (Cloudinary)
- Shopping Cart
- Order Management
- Payment Integration
- Product Reviews & Ratings
- Analytics Dashboard

## Project Structure

```
eco/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── productController.js # Product CRUD logic
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication middleware
│   │   └── errorHandler.js    # Error handling utility
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Product.js         # Product schema
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   └── products.js        # Product routes
│   ├── seed.js                # Database seed script
│   ├── server.js              # Express server
│   ├── package.json
│   └── .env.example           # Environment variables template
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx     # Navigation component
    │   │   └── Footer.jsx     # Footer component
    │   ├── context/
    │   │   └── AuthContext.jsx # Authentication context
    │   ├── pages/
    │   │   ├── Home.jsx       # Landing page
    │   │   ├── Products.jsx   # Product listing
    │   │   ├── ProductDetails.jsx # Product details
    │   │   ├── Login.jsx      # Login page
    │   │   └── Register.jsx   # Registration page
    │   ├── utils/
    │   │   └── api.js         # Axios configuration
    │   ├── App.jsx            # Main app component
    │   ├── main.jsx           # React entry point
    │   └── index.css          # Tailwind styles
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/greencraft
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

5. Seed the database with sample products:
```bash
node seed.js
```

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products (supports search, category, ecoBadge filters)
- `GET /api/products/categories` - Get all unique categories
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Health Check
- `GET /api/health` - API health check

## Product Schema

Each product contains:
- `name` - Product name
- `description` - Product description
- `price` - Product price
- `category` - Product category (Home Decor, Jewelry, Clothing, etc.)
- `images` - Array of image URLs
- `ecoBadge` - Eco badge (Handmade, Organic, Recycled, etc.)
- `sellerName` - Seller name

## Eco Badges

- Handmade
- Organic
- Recycled
- Sustainable
- Natural
- Upcycled

## Categories

- Home Decor
- Jewelry
- Clothing
- Accessories
- Art
- Kitchen
- Personal Care
- Other

## Authentication Flow

1. User registers with name, email, and password
2. Server hashes password with bcrypt
3. Server generates JWT token
4. Token stored in localStorage
5. Token sent with every API request in Authorization header
6. Protected routes verify token before allowing access

## Development

### Running Both Servers

Open two terminal windows:

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

Backend:
```bash
cd backend
npm start
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `NODE_ENV` - Environment (development/production)

## Error Handling

The API uses consistent error responses:
```json
{
  "success": false,
  "message": "Error message"
}
```

## Security Features

- Password hashing with bcryptjs
- JWT authentication
- Protected routes
- Input validation with express-validator
- CORS enabled
- Environment variables for sensitive data

## Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

## Contact

For support, email: support@greencraft.com
