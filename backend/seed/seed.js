import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import categories from "./categories.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import products from "./products.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Connected to MongoDB");

    // Delete existing categories and prods
    await Category.deleteMany();
    await Product.deleteMany();
    // Insert fresh categories
    await Category.insertMany(categories);
    
    console.log("Categories seeded successfully!");
    const seller = await User.findOne();
    if (!seller) {
  throw new Error(
    "No users found. Please register one user before seeding products."
  );
}
const productsWithSeller = products.map(product => ({
  ...product,
  seller: seller._id
}));
await Product.insertMany(productsWithSeller);

console.log("Products seeded.");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);

    process.exit(1);
  }
};

seedDatabase();