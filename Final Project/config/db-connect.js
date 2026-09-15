const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const MenuItem = require("../models/menu-model");
const User = require("../models/user-model");
const menuData = require("../data/menu-data.json");

const seedDatabase = async () => {
  const menuOperations = menuData.map((item) => ({
    updateOne: {
      filter: { name: item.name },
      update: { $set: { ...item, category: item.category.toLowerCase() } },
      upsert: true,
    },
  }));
  const result = await MenuItem.bulkWrite(menuOperations);
  if (result.upsertedCount || result.modifiedCount) console.log(`Synchronized ${menuData.length} menu items`);

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword && !(await User.exists({ email: adminEmail }))) {
    await User.create({
      firstName: "Saffron",
      lastName: "Admin",
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });
    console.log(`Created admin account for ${adminEmail}`);
  }
};

const dbConnect = async () => {
  if (!process.env.MONGODB_URI) {
    console.log("Database connection skipped: MONGODB_URI is not configured");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });

    console.log("Database connected successfully");
    await seedDatabase();
  } catch (error) {
    console.log(`Database connection error: ${error.message}`);
  }
};

module.exports = dbConnect;
