// MONGOOSE
const mongoose = require('mongoose');

// CONNECTING TO MONGODB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log('MongoDB connected !');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
