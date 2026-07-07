# GreenCraft Setup Guide

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/greencraft
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

Seed the database:
```bash
node seed.js
```

Start backend:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB Community Server
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/greencraft`

### Option 2: MongoDB Atlas (Cloud)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get connection string
4. Update MONGODB_URI in .env

## Default Test User

After seeding, you can register a new user or use the API directly.

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify .env file exists and has correct values
- Check if port 5000 is available

### Frontend won't start
- Verify npm install completed successfully
- Check if port 3000 is available
- Ensure backend is running on port 5000

### Products not loading
- Run seed.js to populate database
- Check MongoDB connection
- Verify API is accessible at http://localhost:5000/api/health
