require('dotenv').config();

const cors = require('cors');
const express = require('express');
const connectDatabase = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Authentication API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }

  if (error.code === 11000) {
    return res.status(409).json({ message: 'A user with this email already exists' });
  }

  console.error(error);
  return res.status(500).json({ message: 'Something went wrong' });
});

async function startServer() {
  await connectDatabase();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error(`Unable to start server: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { app, startServer };
