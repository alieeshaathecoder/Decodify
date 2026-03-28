import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect("mongodb+srv://alieeshaathecoder_db_user:FeGm50pXa3oxm38U@cluster0.f79xvzs.mongodb.net/");
    console.log("MONGODB CONNECTED");
    return connectionInstance;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;