import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI
        : "mongodb://localhost:27017/comp308-group-project";

    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

export default connectDB;
