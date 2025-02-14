import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    const uri: string = process.env.MONGODB_URI as string;
    if (!uri) throw new Error("MONGODB_URI is not defined");

    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error: unknown) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export default connectMongoDB;
