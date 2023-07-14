const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('Successfully connected to mongoose');
  } catch (error) {
    console.log('Connecting to mongoose failed');
  }
};

module.exports = dbConnect;
