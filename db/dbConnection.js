const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const dbConnection = asyncHandler(async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
});

module.exports = dbConnection;

