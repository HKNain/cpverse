import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("MongoDB URI missing");
}

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(MONGODB_URI);

        isConnected = true;

        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
        throw new Error("DB Connection Failed");
    }
};