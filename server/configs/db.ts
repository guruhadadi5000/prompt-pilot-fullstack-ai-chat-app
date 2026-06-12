import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    await mongoose.connect(`${process.env.MONGO_DB_URI}/promptpilot`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
