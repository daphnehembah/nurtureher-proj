require('dotenv').config();
const app = require('./app');
const connectDB = require('../config/db');

const PORT = process.env.PORT || 3000;

// connect database FIRST
connectDB();

// then start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});