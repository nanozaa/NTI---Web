const mongoose = require("mongoose");

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
  } catch (error) {
    console.log(`Database connection error: ${error.message}`);
  }
};

module.exports = dbConnect;
