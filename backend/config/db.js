import mongoose from 'mongoose';
import colors from 'colors';

//Define the connection to our data that will return Promise
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.error(` Error : ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
