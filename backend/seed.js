import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products');

    // Sample products
    const products = [
      {
        name: 'Handwoven Bamboo Basket',
        description: 'Beautiful handwoven basket made from sustainable bamboo. Perfect for storage or as a decorative piece.',
        price: 45.99,
        category: 'Home Decor',
        images: ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500'],
        ecoBadge: 'Handmade',
        sellerName: 'EcoWeavers'
      },
      {
        name: 'Organic Cotton Tote Bag',
        description: '100% organic cotton tote bag with natural dyes. Spacious and durable for everyday use.',
        price: 24.99,
        category: 'Accessories',
        images: ['https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=500'],
        ecoBadge: 'Organic',
        sellerName: 'NatureCarry'
      },
      {
        name: 'Recycled Glass Vase',
        description: 'Elegant vase crafted from 100% recycled glass. Each piece is unique with subtle variations.',
        price: 38.50,
        category: 'Home Decor',
        images: ['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500'],
        ecoBadge: 'Recycled',
        sellerName: 'GlassArtistry'
      },
      {
        name: 'Natural Beeswax Candles',
        description: 'Set of 3 pure beeswax candles with cotton wicks. Clean burning with a subtle honey aroma.',
        price: 18.99,
        category: 'Home Decor',
        images: ['https://images.unsplash.com/photo-1602607432833-6a8d6c7e1c9c?w=500'],
        ecoBadge: 'Natural',
        sellerName: 'HiveLights'
      },
      {
        name: 'Upcycled Denim Apron',
        description: 'Sturdy apron made from upcycled denim jeans. Features adjustable straps and multiple pockets.',
        price: 32.00,
        category: 'Kitchen',
        images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500'],
        ecoBadge: 'Upcycled',
        sellerName: 'DenimRevive'
      },
      {
        name: 'Handmade Silver Leaf Earrings',
        description: 'Delicate leaf-shaped earrings crafted from recycled sterling silver. Nature-inspired design.',
        price: 55.00,
        category: 'Jewelry',
        images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500'],
        ecoBadge: 'Handmade',
        sellerName: 'SilverSprout'
      },
      {
        name: 'Organic Lavender Soap',
        description: 'Handmade soap with organic lavender essential oil and dried lavender buds. Gentle on skin.',
        price: 8.50,
        category: 'Personal Care',
        images: ['https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500'],
        ecoBadge: 'Organic',
        sellerName: 'BotanicalBath'
      },
      {
        name: 'Sustainable Bamboo Utensil Set',
        description: 'Complete utensil set including fork, knife, spoon, and chopsticks made from fast-growing bamboo.',
        price: 15.99,
        category: 'Kitchen',
        images: ['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500'],
        ecoBadge: 'Sustainable',
        sellerName: 'BambooKitchen'
      },
      {
        name: 'Recycled Paper Notebook',
        description: 'Eco-friendly notebook made from 100% post-consumer recycled paper. 100 lined pages.',
        price: 12.99,
        category: 'Art',
        images: ['https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500'],
        ecoBadge: 'Recycled',
        sellerName: 'PaperWorks'
      },
      {
        name: 'Hand-knitted Wool Scarf',
        description: 'Cozy scarf hand-knitted from ethically sourced wool. Natural dyes in earth tones.',
        price: 42.00,
        category: 'Clothing',
        images: ['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500'],
        ecoBadge: 'Handmade',
        sellerName: 'WarmWeaves'
      },
      {
        name: 'Natural Wood Cutting Board',
        description: 'Handcrafted cutting board from reclaimed oak wood. Food-safe finish with natural oils.',
        price: 48.00,
        category: 'Kitchen',
        images: ['https://images.unsplash.com/photo-1594226801341-41427b4e5c27?w=500'],
        ecoBadge: 'Sustainable',
        sellerName: 'WoodCraft'
      },
      {
        name: 'Organic Lip Balm Set',
        description: 'Set of 3 organic lip balms with beeswax, coconut oil, and natural flavors. Plastic-free packaging.',
        price: 14.50,
        category: 'Personal Care',
        images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500'],
        ecoBadge: 'Organic',
        sellerName: 'PureLips'
      }
    ];

    await Product.insertMany(products);
    console.log('Products seeded successfully');

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts();
