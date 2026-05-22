import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import ProductModel from "./models/product.model.js";

const newProducts = [
  {
    name: "Coca-Cola Classic Can",
    price: 40,
    unit: "300 ml",
    stock: 150,
    discount: 5,
    description: "Classic original taste Coca-Cola can. Serve chilled.",
    category: ["6a106ae0a14c3293036b7e6e"], // Beverages
    subCategory: ["6a106ae1a14c3293036b7e92"], // Soft Drinks
    image: [
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600",
      "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=600",
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=600",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600"
    ]
  },
  {
    name: "Pepsi Soda Can",
    price: 38,
    unit: "300 ml",
    stock: 120,
    discount: 4,
    description: "Bold, robust and deeply refreshing Pepsi cola can.",
    category: ["6a106ae0a14c3293036b7e6e"], // Beverages
    subCategory: ["6a106ae1a14c3293036b7e92"], // Soft Drinks
    image: [
      "https://images.unsplash.com/photo-1629245482402-7c32d948aa92?q=80&w=600",
      "https://images.unsplash.com/photo-1546263416-5ac72c6cc7f5?q=80&w=600",
      "https://images.unsplash.com/photo-1534080391025-09795d197360?q=80&w=600",
      "https://images.unsplash.com/photo-1632245889027-e406faaa79ca?q=80&w=600"
    ]
  },
  {
    name: "Lay's Classic Salted Chips",
    price: 20,
    unit: "50 g",
    stock: 200,
    discount: 0,
    description: "Crispy, golden, salted potato chips. Perfect snack for any time.",
    category: ["6a106ae0a14c3293036b7e67"], // Snacks & Munchies
    subCategory: ["6a106ae1a14c3293036b7e80"], // Chips & Crisps
    image: [
      "https://images.unsplash.com/photo-1566478989037-eecbf906b136?q=80&w=600",
      "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?q=80&w=600",
      "https://images.unsplash.com/photo-1621447509373-b4d26f906f39?q=80&w=600",
      "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?q=80&w=600"
    ]
  },
  {
    name: "Premium Roasted Almonds",
    price: 350,
    unit: "250 g",
    stock: 80,
    discount: 10,
    description: "Crunchy, roasted premium almonds. Packed with nutrients and energy.",
    category: ["6a106ae0a14c3293036b7e67"], // Snacks & Munchies
    subCategory: ["6a106ae1a14c3293036b7e86"], // Nuts & Dry Fruits
    image: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=600",
      "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=600",
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=600",
      "https://images.unsplash.com/photo-1506543731388-4970d4afc909?q=80&w=600"
    ]
  },
  {
    name: "Organic Green Tea Bag Pack",
    price: 180,
    unit: "25 bags",
    stock: 100,
    discount: 8,
    description: "Rich in antioxidants, refresh and revitalize your mind with premium green tea.",
    category: ["6a106ae0a14c3293036b7e6e"], // Beverages
    subCategory: ["6a106ae1a14c3293036b7e95"], // Tea & Coffee
    image: [
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=600",
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=600",
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600"
    ]
  },
  {
    name: "Tomato Ketchup Premium",
    price: 120,
    unit: "500 g",
    stock: 90,
    discount: 12,
    description: "Tangy and sweet tomato ketchup made from handpicked ripe tomatoes.",
    category: ["6a106ae0a14c3293036b7e6b"], // Spices & Sauces
    subCategory: ["6a106ae1a14c3293036b7e8f"], // Sauces & Spreads
    image: [
      "https://images.unsplash.com/photo-1607305387299-a3d9611cd46f?q=80&w=600",
      "https://images.unsplash.com/photo-1602404070022-a34e45d4d38e?q=80&w=600",
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600",
      "https://images.unsplash.com/photo-1583064313642-a4897d64309e?q=80&w=600"
    ]
  },
  {
    name: "Fresh Premium Butter",
    price: 260,
    unit: "500 g",
    stock: 140,
    discount: 5,
    description: "Deliciously rich and creamy premium table butter.",
    category: ["6a106ae0a14c3293036b7e64"], // Dairy & Bread
    subCategory: ["6a106ae0a14c3293036b7e7d"], // Butter & Cheese
    image: [
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=600",
      "https://images.unsplash.com/photo-1634324209599-556b6b7a5bf7?q=80&w=600",
      "https://images.unsplash.com/photo-1628102476629-8824151b54a6?q=80&w=600",
      "https://images.unsplash.com/photo-1622484211148-7170a827b508?q=80&w=600"
    ]
  },
  {
    name: "Whole Wheat Sandwich Bread",
    price: 45,
    unit: "400 g",
    stock: 70,
    discount: 0,
    description: "Freshly baked healthy whole wheat bread slices for your morning sandwich.",
    category: ["6a106ae0a14c3293036b7e64"], // Dairy & Bread
    subCategory: ["6a106ae0a14c3293036b7e7a"], // Bread & Pav
    image: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600",
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600",
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600",
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=600"
    ]
  },
  {
    name: "Premium Coffee Powder",
    price: 290,
    unit: "100 g",
    stock: 110,
    discount: 15,
    description: "Aromatically rich instant coffee powder, crafted with carefully chosen Robusta beans.",
    category: ["6a106ae0a14c3293036b7e6e"], // Beverages
    subCategory: ["6a106ae1a14c3293036b7e95"], // Tea & Coffee
    image: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600"
    ]
  },
  {
    name: "Rich Chocolate Chip Cookies",
    price: 65,
    unit: "150 g",
    stock: 160,
    discount: 10,
    description: "Crispy cookies loaded with delicious real chocolate chips.",
    category: ["6a106ae0a14c3293036b7e67"], // Snacks & Munchies
    subCategory: ["6a106ae1a14c3293036b7e83"], // Biscuits & Cookies
    image: [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600",
      "https://images.unsplash.com/photo-1558961309-db5f14c2738a?q=80&w=600",
      "https://images.unsplash.com/photo-1600431521340-491eca880813?q=80&w=600",
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=600"
    ]
  }
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.mongodb_url);
  console.log("Connected!");

  let seededCount = 0;
  for (const prod of newProducts) {
    const exists = await ProductModel.findOne({ name: prod.name });
    if (!exists) {
      const newProd = new ProductModel(prod);
      await newProd.save();
      console.log(`Seeded: ${prod.name}`);
      seededCount++;
    } else {
      console.log(`Skipped (already exists): ${prod.name}`);
    }
  }

  console.log(`\nSeed completed! Successfully seeded ${seededCount} new products.`);
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error("Error seeding products:", err);
  process.exit(1);
});
