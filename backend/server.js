const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. MIDDLEWARE
// Allows the server to accept JSON data from your React frontend
app.use(express.json()); 
// Prevents "CORS Policy" errors when your frontend (port 5173) calls this backend (port 5000)
app.use(cors()); 

// 2. DATABASE CONNECTION
// We use Mongoose to talk to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Electro Database Connected...');
  } catch (err) {
    console.error('❌ Database Connection Failed:', err.message);
    process.exit(1); // Stop the server if DB fails
  }
};

connectDB();

// 3. BASE ROUTE (Testing)
app.get('/', (req, res) => {
  res.send('Electro Backend API is Running...');
});

// 4. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});