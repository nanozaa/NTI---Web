require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const menuItemRoutes = require('./routes/menuItemRoutes');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/restaurant_db';

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Restaurant API is running' });
});

app.use('/menuItem', menuItemRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
      console.log(`Restaurant API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
